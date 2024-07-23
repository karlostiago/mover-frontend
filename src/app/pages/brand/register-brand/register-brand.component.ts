import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AbstractRegister} from "../../../../abstract/AbstractRegister";
import {BrandEntity} from "../../../../entity/BrandEntity";
import {NgForm} from "@angular/forms";
import {BrandService} from "../brand.service";
import {AlertService} from "../../../../service/AlertService";
import {environment} from "../../../../environments/environment";
import {SymbolService} from "../symbol.service";
import {SymbolEntity} from "../../../../entity/SymbolEntity";

@Component({
    selector: 'app-register-brand',
    templateUrl: './register-brand.component.html',
    styleUrls: ['./register-brand.component.css']
})
export class RegisterBrandComponent extends AbstractRegister implements OnInit {

    symbols = new Array<SymbolEntity>();

    brand = new BrandEntity();

    selectedSymbolId: number = 0;

    uploadURL = `${environment.apiUrl}/brands/upload?filename=`;

    constructor(protected override activatedRoute: ActivatedRoute,
                private brandService: BrandService,
                private symbolService: SymbolService,
                private alertService: AlertService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        await this.loadSymbols();

        if (!this.registerNew) {
            this.brandService.findById(this.id).then(response => {
                this.brand = response;
                this.selectedSymbolId = this.brand.symbol.id;
            });
        }
    }

    saveOrUpdate(form: NgForm) {
        this.findSymbolById();
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
        this.alertService.success("Carregamento da imagem executado com sucesso.");
        await this.loadSymbols();
    }

    uploadError(e: any) {
        this.alertService.error("Erro no carregamento da imagem.");
    }

    uploadSymbolDisabled() {
        return this.brand.name == null || this.brand.name.length <= 2;
    }

    private findSymbolById() {
        const symbol = this.symbols.filter(symbol => symbol.id === this.selectedSymbolId)[0];
        if (symbol) this.brand.symbol = symbol;
    }

    private save(form: NgForm) {
        this.brandService.save(this.brand).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            form.resetForm();
        }).catch(error => {
            this.alertService.error("Não foi possível registrar, " + error);
        });
    }

    private update() {
        this.brandService.update(this.brand).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        }).catch(error => {
            this.alertService.error("Não foi possível atualizar, " + error);
        });
    }

    private async loadSymbols() {
        const symbols = await this.symbolService.findAll();
        for (const symbol of symbols) {
            this.symbols.push(symbol)
        }
    }
}
