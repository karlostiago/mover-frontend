import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../../service/AlertService";
import {VehicleService} from "../vehicle.service";
import {VehicleEntity} from "../../../../../entity/VehicleEntity";
import {Table} from "primeng/table";
import {GlobalDialogService, TypeDialog} from "../../../../../shared/service/GlobalDialogService";
import {AuthService} from "../../../../core/login/auth.service";
import {ErrorHandler} from "../../../../core/handler/ErrorHandler";

@Component({
  selector: 'app-search-vehicle',
  templateUrl: './search-vehicle.component.html',
  styleUrls: ['./search-vehicle.component.css']
})
export class SearchVehicleComponent implements OnInit {

    vehicles = new Array<VehicleEntity>();
    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private globalDialogService: GlobalDialogService,
                protected authService: AuthService,
                private error: ErrorHandler,
                private vehicleService: VehicleService) {
    }

    ngOnInit(): void {
        this.vehicleService.findAll().then(response => {
            this.vehicles = response;
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
            this.vehicles = this.vehicles.filter(v => v.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.vehicleService.findBy(this.searchFilter).then(response => {
            this.vehicles = response;
            this.table?.reset();
        });
    }

    showDialogFipe(vehicleId: number) {
        if (this.authService.hasPermission('VIEW_FIPE_VEHICLES')) {
            this.globalDialogService.openDialog(TypeDialog.FIPE, vehicleId);
        } else {
            this.error.capture({ status: 403 })
        }
    }
}
