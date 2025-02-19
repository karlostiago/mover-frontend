import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../service/AlertService";
import {AccountEntity} from "../../../../../entity/AccountEntity";
import {AccountService} from "../account.service";
import {BankIconEntity} from "../../../../../entity/BankIconEntity";
import {OptionEnum} from "../../../../../enum/OptionEnum";
import {AuthService} from "../../../../core/login/auth.service";

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})
export class RegisterAccountComponent extends AbstractRegister implements OnInit {

    account = new AccountEntity();
    optionsEnum = new Array<string>();
    selectedOption:  string | null = null;

    iconSelected: BankIconEntity;

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                protected authService: AuthService,
                private accountService: AccountService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        this.loadingOptions();

        if (!this.registerNew) {
            this.accountService.findById(this.id).then(response => {
                this.account = response;
                this.iconSelected = new BankIconEntity(this.account.codeIcon, this.account.imageIcon);
                this.selectedOption = this.account.caution ? OptionEnum.YES : OptionEnum.NO;
            });
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.account.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    onChangeOption() {
        if (this.selectedOption) {
            this.account.caution = this.selectedOption === 'SIM';
        }
    }

    override cancel(form: NgForm) {
        form.resetForm({
            active: true,
            initialBalance: 0,
            caution: 'NÃO'
        });
        this.iconSelected = new BankIconEntity();
        this.selectedOption = this.account.caution ? OptionEnum.YES : OptionEnum.NO;
    }

    private save(form: NgForm) {
        this.accountService.save(this.account).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            this.cancel(form);
        });
    }

    private update() {
        this.accountService.update(this.account.id, this.account).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }

    private loadingOptions() {
        for (const value of Object.values(OptionEnum)) {
            this.optionsEnum.push(value);
        }
        this.selectedOption = 'NÃO';
    }
}
