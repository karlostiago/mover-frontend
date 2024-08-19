import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AbstractRegister} from "../../../../abstract/AbstractRegister";
import {BrandEntity} from "../../../../entity/BrandEntity";
import {NgForm} from "@angular/forms";
import {BrandService} from "../brand.service";
import {AlertService} from "../../../../service/AlertService";
import {environment} from "../../../../environments/environment";
import {SymbolService} from "../symbol.service";
import {SymbolEntity} from "../../../../entity/SymbolEntity";
import {FileUpload} from "primeng/fileupload";

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

    @ViewChild("fileUpload") fileUpload: FileUpload | undefined;

    constructor(protected override activatedRoute: ActivatedRoute,
                private brandService: BrandService,
                private symbolService: SymbolService,
                private alertService: AlertService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        await this.loadingSymbols();

        if (!this.registerNew) {
            this.brandService.findById(this.id).then(response => {
                this.brand = response;
                this.symbols.push(this.brand.symbol);
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
        await this.loadingSymbols();
        this.selectedSymbolId = this.symbols[this.symbols.length - 1].id;
    }

    uploadError(e: any) {
        this.alertService.error("Erro no carregamento da imagem. " + e.error.error[0]['message']);
        this.fileUpload?.clear();
    }

    uploadSymbolDisabled() {
        return this.brand.name == null || this.brand.name.length <= 2;
    }

    formValid() {
        return this.selectedSymbolId !== 0 && this.brand.name.length > 0;
    }

    override cancel(form: NgForm) {
        form.resetForm({
            active: true,
            name: ""
        });
    }

    private findSymbolById() {
        const symbol = this.symbols.filter(symbol => symbol.id === this.selectedSymbolId)[0];
        if (symbol) this.brand.symbol = symbol;
    }

    private save(form: NgForm) {
        this.loadEmptySymbolWhenNotSelected();
        this.brandService.save(this.brand).then(() => {
            this.symbols = this.symbols.filter(s => s.id !== this.brand.symbol.id);
            this.alertService.success("Registro cadastrado com sucesso.");
            this.cancel(form);
        });
    }

    private loadEmptySymbolWhenNotSelected() {
        if (!this.selectedSymbolId) {
            const symbol = new SymbolEntity();
            symbol.imageBase64 = "empty";
            symbol.description = "empty";
            this.brand.symbol = symbol;
        }
    }

    private update() {
        this.brandService.update(this.brand.id, this.brand).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }

    private async loadingSymbols() {
        const symbols = await this.symbolService.findAll();
        for (const symbol of symbols) {
            this.symbols.push(symbol)
        }
    }
}
