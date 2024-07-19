import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AbstractRegister} from "../../../../abstract/AbstractRegister";
import {SymbolBrandBase64} from "../../../../enum/SymbolBrandBase64";
import {BrandEntity} from "../../../../entity/BrandEntity";
import {NgForm} from "@angular/forms";
import {BrandService} from "../brand.service";
import {AlertService} from "../../../../service/AlertService";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-register-brand',
    templateUrl: './register-brand.component.html',
    styleUrls: ['./register-brand.component.css']
})
export class RegisterBrandComponent extends AbstractRegister implements OnInit {

    uploadURL = `${environment.apiUrl}/brands/upload`;

    symbols = new Array<string>();

    selectedSymbol: string = "";

    brand = new BrandEntity();

    constructor(protected override activatedRoute: ActivatedRoute,
                private brandService: BrandService,
                private alertService: AlertService) {
        super(activatedRoute);
    }

    ngOnInit(): void {
        this.loadSymbols();
    }

    saveOrUpdate(form: NgForm) {
        if (this.brand.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    private save(form: NgForm) {
        this.brand.symbol = this.selectedSymbol;
        this.brandService.save(this.brand).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            this.brand = new BrandEntity();
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

    private loadSymbols() {
        for (const key in SymbolBrandBase64) {
            // @ts-ignore
            this.symbols.push(SymbolBrandBase64[`${key}`]);
        }
    }
}
