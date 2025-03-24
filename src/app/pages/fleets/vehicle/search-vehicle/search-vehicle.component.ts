import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../../shared/service/AlertService";
import {VehicleService} from "../vehicle.service";
import {VehicleEntity} from "../../../../../entity/VehicleEntity";
import {GlobalDialogService, TypeDialog} from "../../../../../shared/service/GlobalDialogService";
import {AuthService} from "../../../../core/login/auth.service";
import {ErrorHandler} from "../../../../core/handler/ErrorHandler";
import {AbstractSearch} from "../../../../../abstract/AbstractSearch";

@Component({
  selector: 'app-search-vehicle',
  templateUrl: './search-vehicle.component.html',
  styleUrls: ['./search-vehicle.component.css']
})
export class SearchVehicleComponent extends AbstractSearch implements OnInit {

    vehicles = new Array<VehicleEntity>();
    searchFilter: string = "";

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private globalDialogService: GlobalDialogService,
                protected authService: AuthService,
                private error: ErrorHandler,
                private vehicleService: VehicleService) {
        super();
    }

    ngOnInit(): void {
        this.vehicleService.findAll().then(response => {
            this.vehicles = super.findAll(response);
        });
    }

    confirmationDelete(vehicle: VehicleEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir o veículo ${vehicle['fullname']}?`,
            accept: () => {
                this.delete(vehicle.id);
            }
        })
    }

    delete(id: number) {
        this.vehicleService.delete(id).then(() => {
            this.vehicles = super.deleteById(id, this.vehicles);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.vehicleService.findBy(this.searchFilter).then(response => {
            this.vehicles = response;
        });
    }

    showDialogFipe(vehicleId: number) {
        if (this.authService.hasPermission('VIEW_FIPE_VEHICLES')) {
            this.globalDialogService.openDialog(TypeDialog.FIPE, vehicleId);
        } else {
            this.error.capture({ status: 403 })
        }
    }

    createFieldsSidebarDetails() {
        this.fields = [
            { label: 'Marca', value: this.selectedValue.brandName, col: 3 },
            { label: 'Modelo', value: this.selectedValue.modelName, col: 3 },
            { label: 'Placa', value: this.selectedValue.licensePlate, col: 2 },
            { label: 'Ano fabricação', value: this.selectedValue.yearManufacture, col: 2 },
            { label: 'Ano modelo', value: this.selectedValue.modelYear, col: 2 },
            { label: 'Renavam', value: this.selectedValue.renavam, col: 3 },
            { label: 'Km de aquisição', value: this.selectedValue.mileageAtAcquisition, col: 3 },
            { label: 'Cor', value: this.selectedValue.color, col: 2 },
            { label: 'Tipo combustível', value: this.selectedValue.fuelType, col: 2 },
            { label: 'Valor aquisição', value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.selectedValue.acquisitionValue), col: 2 },
            { label: 'Data de aquisição', value: this.selectedValue.acquisitionDate, col: 3 },
            { label: 'Data de disponibilidade', value: this.selectedValue.availabilityDate, col: 3 },
            { label: 'Valor fipe aquisição', value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.selectedValue.fipeValueAtAcquisition), col: 2 },
            { label: 'Leilão', value: this.selectedValue.auction ? 'SIM' : 'NÃO', col: 2 },
            { label: 'Situação', value: this.selectedValue.situation, col: 2 },
            { label: 'Ativo', value: this.selectedValue.active ? 'SIM' : 'NÃO', col: 3 }
        ]
    }
}
