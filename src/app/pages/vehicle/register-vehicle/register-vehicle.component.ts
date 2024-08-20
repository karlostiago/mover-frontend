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
import {FuelTypeEntity} from "../../../../entity/FuelTypeEntity";
import {OptionEnum} from "../../../../enum/OptionEnum";

@Component({
  selector: 'app-register-vehicle',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.css']
})
export class RegisterVehicleComponent extends AbstractRegister implements OnInit {

    vehicle = new VehicleEntity();
    vehicles = new Array<VehicleEntity>();
    models = new Array<ModelEntity>();
    brands = new Array<BrandEntity>();
    fuelTypes = new Array<FuelTypeEntity>();
    optionsEnum = new Array<string>();

    selectedBrandId = null;
    selectedModelId = null;
    selectedFuelTypeId = null;
    blockSelectedModel = true;

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private brandService: BrandService,
                private modelService: ModelService,
                private vehicleService: VehicleService) {
        super(activatedRoute);
    }

    ngOnInit(): void {
        this.loadingBrands();
        this.loadingFuelTypes();
        this.loadingOptions();
    }

    saveOrUpdate(form: NgForm) {
        if (this.vehicle.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    onChangeFindModel() {
        // @ts-ignore
        this.modelService.findByBrandId(this.selectedBrandId).then(response => {
            this.models = response;
            this.blockSelectedModel = false;
        });
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

    private loadingFuelTypes() {
        this.vehicleService.findFuelTypes().then(response => {
            this.fuelTypes = response;
        });
    }

    private loadingOptions() {
        for (const value of Object.values(OptionEnum)) {
            this.optionsEnum.push(value);
        }
    }
}
