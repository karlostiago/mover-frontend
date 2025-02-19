import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../service/AlertService";
import {AccountEntity} from "../../../../../entity/AccountEntity";
import {CardService} from "../card.service";
import {BankIconEntity} from "../../../../../entity/BankIconEntity";
import {CardEntity} from "../../../../../entity/CardEntity";
import {AccountService} from "../../account/account.service";

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css']
})
export class RegisterCardComponent extends AbstractRegister implements OnInit {
    card = new CardEntity();
    accounts = new Array<AccountEntity>();
    iconSelected: BankIconEntity;

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private cardService: CardService,
                private accountService: AccountService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        await this.loadingAccounts();
        this.defaultType();

        if (!this.registerNew) {
            this.cardService.findById(this.id).then(response => {
                this.card = response;
                this.iconSelected = new BankIconEntity(this.card.codeIcon, this.card.imageIcon);
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

    override cancel(form: NgForm) {
        form.resetForm({
            active: true,
            limit: 0,
        });
        this.iconSelected = new BankIconEntity();
    }

    private save(form: NgForm) {
        this.cardService.save(this.card).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            this.cancel(form);
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

    private async loadingAccounts() {
        await this.accountService.findAll().then(response => {
            // @ts-ignore
            this.accounts = [{ id: 0, name: 'Selecione' }, ...response];
        })
    }
}
