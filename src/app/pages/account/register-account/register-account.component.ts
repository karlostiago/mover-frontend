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
    uploadURL = `${environment.apiUrl}/accounts/upload?filename=`;

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

    updateURL(e: any) {
        // e.formData.append('filename', this.brand.name);
    }

    async uploadSuccess(e: any) {
        // this.alertService.success("Carregamento da imagem executado com sucesso.");
        // await this.loadingSymbols();
        // this.selectedSymbolId = this.symbols[this.symbols.length - 1].id;
    }

    uploadError(e: any) {
        this.alertService.error("Erro na importação do ícone. " + e.error.error[0]['message']);
        this.fileUpload?.clear();
    }

    uploadSymbolDisabled() {
        return this.account.name == null || this.account.name.length <= 3;
    }

    private save(form: NgForm) {
        // this.modelService.save(this.model).then(() => {
        //     this.alertService.success("Registro cadastrado com sucesso.");
        //     form.resetForm({
        //         active: true,
        //         name: "",
        //         color: "",
        //     });
        // });
    }

    private update() {
        // this.modelService.update(this.model.id, this.model).then(() => {
        //     this.alertService.success("Registro atualizado com sucesso.");
        // });
    }
}
