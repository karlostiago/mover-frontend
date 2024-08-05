import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../service/AlertService";
import {ModelService} from "../model.service";
import {ModelEntity} from "../../../../entity/ModelEntity";
import {BrandService} from "../../brand/brand.service";
import {BrandEntity} from "../../../../entity/BrandEntity";

@Component({
  selector: 'app-register-model',
  templateUrl: './register-model.component.html',
  styleUrls: ['./register-model.component.css']
})
export class RegisterModelComponent extends AbstractRegister implements OnInit {

    model = new ModelEntity();
    brands = new Array<BrandEntity>();

    selectedBrandId = null;

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private brandService: BrandService,
                private modelService: ModelService) {
        super(activatedRoute);
    }

    ngOnInit(): void {
        this.loadBrands();

        if (!this.registerNew) {
            this.modelService.findById(this.id).then(response => {
                this.model = response;
                this.selectedBrandId = this.model.brandId;
            });
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.selectedBrandId) {
            this.model.brandId = this.selectedBrandId;
        }

        if (this.model.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    inputChange(e: any) {
        const inputValue = e.target.value;
        if (inputValue.length > 4) {
            e.target.value = inputValue.slice(0, 4);
        }
    }

    private save(form: NgForm) {
        this.modelService.save(this.model).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            form.resetForm({
                active: true,
                name: "",
                color: "",
            });
        });
    }

    private update() {
        console.log(this.model.brandId);
        console.log(this.selectedBrandId);
        this.modelService.update(this.model).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }

    private loadBrands() {
        this.brandService.findAll().then(response => {
            this.brands = response;
        });
    }
}
