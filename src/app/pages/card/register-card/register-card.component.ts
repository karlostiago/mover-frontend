import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../service/AlertService";
import {AccountEntity} from "../../../../entity/AccountEntity";
import {CardService} from "../card.service";
import {FileUpload} from "primeng/fileupload";
import {BankIconEntity} from "../../../../entity/BankIconEntity";
import {CardEntity} from "../../../../entity/CardEntity";
import {AccountService} from "../../account/account.service";

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css']
})
export class RegisterCardComponent extends AbstractRegister implements OnInit {
    card = new CardEntity();
    icons = new Array<BankIconEntity>();
    accounts = new Array<AccountEntity>();

    @ViewChild("fileUpload") fileUpload: FileUpload | undefined;

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private cardService: CardService,
                private accountService: AccountService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        await this.loadingIcons();
        await this.loadingAccounts();
        this.defaultType();
        if (!this.registerNew) {
            this.cardService.findById(this.id).then(response => {
                this.card = response;
            });
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.card.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    onChangeAccount() {
        if (this.card['accountId']) {
            const account = this.accounts.filter(c => c.id === this.card['accountId'])[0];
            this.card['codeIcon'] = account.codeIcon;
        }
    }

    override cancel(form: NgForm) {
        form.resetForm({
            active: true,
            initialBalance: 0,
            caution: false
        });
    }

    private save(form: NgForm) {
        this.cardService.save(this.card).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            form.resetForm({
                active: true,
                initialBalance: 0,
                caution: false
            });
        });
    }

    private update() {
        this.cardService.update(this.card.id, this.card).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }

    private defaultType() {
        this.card.cardType = 'CREDIT_DEBIT';
    }

    private async loadingIcons() {
        const icons = await this.accountService.findAllIcons();
        for (const icon of icons) {
            this.icons.push(icon);
        }
    }

    private async loadingAccounts() {
        const accounts = await this.accountService.findAll();
        for (const account of accounts) {
            this.accounts.push(account);
        }
    }
}
