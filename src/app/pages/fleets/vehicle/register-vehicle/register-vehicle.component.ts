import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../shared/service/AlertService";
import {VehicleService} from "../vehicle.service";
import {ModelEntity} from "../../../../../entity/ModelEntity";
import {BrandService} from "../../../configuration/brand/brand.service";
import {BrandEntity} from "../../../../../entity/BrandEntity";
import {VehicleEntity} from "../../../../../entity/VehicleEntity";
import {ModelService} from "../../../configuration/model/model.service";
import {FuelTypeEntity} from "../../../../../entity/FuelTypeEntity";
import {OptionEnum} from "../../../../../enum/OptionEnum";
import {FipeService} from "../fipe.service";
import {LoaderService} from "../../../../core/loader/loader.service";
import {SituationEntity} from "../../../../../entity/SituationEntity";
import {AuthService} from "../../../../core/login/auth.service";

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
    situations = new Array<SituationEntity>();
    optionsEnum = new Array<string>();
    years = new Array<number>();

    blockSelectedModel = true;
    selectedOption:  string | null = null;

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private brandService: BrandService,
                private modelService: ModelService,
                private fipeService: FipeService,
                private loaderService: LoaderService,
                protected authService: AuthService,
                private vehicleService: VehicleService) {
        super(activatedRoute);
    }

    ngOnInit(): void {
        this.loadingBrands();
        this.loadingFuelTypes();
        this.loadingOptions();
        this.loadingSituation();
        this.loadingYearsOfManufactureAndModels();

        if (!this.registerNew) {
            this.vehicleService.findById(this.id).then(response => {
                this.vehicle = response;
                this.setPropertyUpdate();
                this.onChangeFindModel();
            });
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.vehicle.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    onChangeFindModel() {
        if (this.vehicle.brandId) {
            this.blockSelectedModel = false;
            this.modelService.findByBrandId(this.vehicle.brandId).then(response => {
                this.models = response;
            });
        } else {
            this.blockSelectedModel = true;
        }
    }

    onChangeInfoUpdateFipeValueAcquisition() {
        if (!this.isNewRegister() && this.vehicle.acquisitionValue) {
            this.vehicle.fipeValueAtAcquisition = 0;
            this.alertService.warning('O modelo foi modificado. É necessário atualizar o campo valor fipe aquisição!');
        }
    }

    onChangeOption() {
        if (this.selectedOption) {
            this.vehicle.auction = this.selectedOption === 'SIM';
        }
    }

    onChangeResetModel() {
        this.vehicle.modelId = null;
    }

    isValidFipeAtAcquisition() {
        if (this.vehicle.fipeValueAtAcquisition === undefined) {
            return true;
        }
        else if (isNaN(this.vehicle.fipeValueAtAcquisition)) {
            return true;
        }
        else if (this.vehicle.fipeValueAtAcquisition === 0) {
            return true;
        }
        return false;
    }

    async onCalculatedFipe() {
        this.loaderService.automatic = false;
        if(this.vehicle.brandId && this.vehicle.modelId && this.vehicle.yearManufacture && this.vehicle.fuelType) {
            const model = await this.modelService.findById(this.vehicle.modelId).then(response => {
                return response;
            });
            if (model && model.brandName) {
                this.fipeService.calculated(model.brandName, model.name, this.vehicle.modelYear, this.vehicle.fuelType, this.vehicle.acquisitionDate).then(response => {
                    if (response.value > 0) {
                      this.vehicle.fipeValueAtAcquisition = response.value;
                    }
                });
            }
        }
        this.loaderService.automatic = true;
    }

    enable(form: NgForm) {
        const hasPermission = this.authService.hasPermission('REGISTER_VEHICLES') ||
            this.authService.hasPermission('REGISTER_VEHICLES');
        return !form.valid && hasPermission;
    }

    private save(form: NgForm) {
        this.vehicleService.save(this.vehicle).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            this.blockSelectedModel = true;
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
            // @ts-ignore
            this.brands = [{ id: 0, name: 'Selecione' }, ...response];
        });
    }

    private loadingFuelTypes() {
        this.vehicleService.findAllFuelTypes().then(response => {
            this.fuelTypes = [{ code: 0, description: 'Selecione' }, ...response];
        });
    }

    private loadingOptions() {
        for (const value of Object.values(OptionEnum)) {
            this.optionsEnum.push(value);
        }
    }

    private loadingSituation() {
        this.vehicleService.findAllSituation().then(response => {
            this.situations = [{ code: 0, description: 'Selecione' }, ...response];
        })
    }

    private setPropertyUpdate() {
        this.selectedOption = this.vehicle.auction ? OptionEnum.YES : OptionEnum.NO;
        this.blockSelectedModel = false;
    }

    private loadingYearsOfManufactureAndModels() {
        const currentYear = new Date().getFullYear();
        this.years.push(currentYear + 1);

        for (let year = 0; year < 100; year++ ) {
            this.years.push(currentYear - year);
        }
    }
}
