import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AbstractRegister} from "../../../../abstract/AbstractRegister";
import {BrandEntity} from "../../../../entity/BrandEntity";
import {NgForm} from "@angular/forms";
import {BrandService} from "../brand.service";
import {AlertService} from "../../../../service/AlertService";
import {environment} from "../../../../environments/environment";
import {SymbolEntity} from "../../../../entity/SymbolEntity";
import {FileUpload} from "primeng/fileupload";
import {SymbolService} from "../symbol.service";
import {AuthService} from "../../../core/login/auth.service";

@Component({
    selector: 'app-register-brand',
    templateUrl: './register-brand.component.html',
    styleUrls: ['./register-brand.component.css']
})
export class RegisterBrandComponent extends AbstractRegister implements OnInit {

    brand = new BrandEntity();

    uploadURL = `${environment.apiUrl}/brands/upload?filename=`;

    iconSelected: SymbolEntity;

    @ViewChild("fileUpload") fileUpload: FileUpload | undefined;

    constructor(protected override activatedRoute: ActivatedRoute,
                private brandService: BrandService,
                private symbolService: SymbolService,
                protected authService: AuthService,
                private alertService: AlertService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        if (!this.registerNew) {
            this.brandService.findById(this.id).then(response => {
                this.brand = response;
                this.iconSelected = this.brand.symbol;
            });
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.brand.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    updateURL(e: any) {
        e.formData.append('filename', this.brand.name);
    }

    async uploadSuccess(e: any) {
        this.symbolService.findAll().then(response => {
            this.brand.symbol = response.filter(s => s.description === this.brand.name.toUpperCase())[0];
            this.iconSelected = this.brand.symbol;
            this.alertService.success("Carregamento da imagem executado com sucesso.");
        });
    }

    uploadError(e: any) {
        this.alertService.error("Erro no carregamento da imagem. " + e.error.error[0]['message']);
        this.fileUpload?.clear();
    }

    uploadSymbolDisabled() {
        return this.brand.name == null || this.brand.name.length <= 2;
    }

    formValid() {
        return this.brand.symbol?.id !== 0 && this.brand.name.length > 0;
    }

    override cancel(form: NgForm) {
        form.resetForm({
            active: true,
            name: ""
        });
        this.brand.symbol = new SymbolEntity();
        this.iconSelected = this.brand.symbol;
    }

    private save(form: NgForm) {
        this.brandService.save(this.brand).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            this.cancel(form);
        });
    }

    private update() {
        this.brandService.update(this.brand.id, this.brand).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }
}
