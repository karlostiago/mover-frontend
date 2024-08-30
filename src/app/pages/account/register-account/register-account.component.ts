import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../service/AlertService";
import {AccountEntity} from "../../../../entity/AccountEntity";
import {AccountService} from "../account.service";
import {environment} from "../../../../environments/environment";
import {FileUpload} from "primeng/fileupload";
import {BankIconEntity} from "../../../../entity/BankIconEntity";

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})
export class RegisterAccountComponent extends AbstractRegister implements OnInit {

    account = new AccountEntity();
    icons = new Array<BankIconEntity>();

    @ViewChild("fileUpload") fileUpload: FileUpload | undefined;

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private accountService: AccountService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        await this.loadingIcons();

        if (!this.registerNew) {
            this.accountService.findById(this.id).then(response => {
                this.account = response;
            });
        }
    }

    private async loadingIcons() {
        const icons = await this.accountService.findAllIcons();
        for (const icon of icons) {
            this.icons.push(icon);
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.account.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    private save(form: NgForm) {
        this.accountService.save(this.account).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            form.resetForm({
                active: true,
                caution: false
            });
        });
    }

    private update() {
        // this.modelService.update(this.model.id, this.model).then(() => {
        //     this.alertService.success("Registro atualizado com sucesso.");
        // });
    }
}
