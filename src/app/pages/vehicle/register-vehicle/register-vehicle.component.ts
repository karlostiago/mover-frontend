import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../service/AlertService";
import {VehicleService} from "../vehicle.service";
import {ModelEntity} from "../../../../entity/ModelEntity";
import {BrandService} from "../../brand/brand.service";
import {BrandEntity} from "../../../../entity/BrandEntity";
import {VehicleEntity} from "../../../../entity/VehicleEntity";
import {ModelService} from "../../model/model.service";

@Component({
  selector: 'app-register-model',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.css']
})
export class RegisterVehicleComponent extends AbstractRegister implements OnInit {

    vehicle = new VehicleEntity();
    vehicles = new Array<VehicleEntity>();
    models = new Array<ModelEntity>();
    brands = new Array<BrandEntity>();

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private brandService: BrandService,
                private modelService: ModelService,
                private vehicleService: VehicleService) {
        super(activatedRoute);
    }

    ngOnInit(): void {
        this.loadingBrands();
        this.loadingModels();
    }

    saveOrUpdate(form: NgForm) {
        if (this.vehicle.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    private save(form: NgForm) {
        this.vehicleService.save(this.vehicle).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            form.resetForm({
                active: true
            });
        });
    }

    private update() {
        this.vehicleService.update(this.vehicle.id, this.vehicle).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }

    private loadingBrands() {
        this.brandService.findAll().then(response => {
            this.brands = response;
        });
    }

    private loadingModels() {
        this.modelService.findAll().then(response => {
            this.models = response;
        });
    }
}
