import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../service/AlertService";
import {VehicleService} from "../vehicle.service";
import {VehicleEntity} from "../../../../entity/VehicleEntity";
import {Table} from "primeng/table";

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
                private vehicleService: VehicleService) {
    }

    ngOnInit(): void {
        this.vehicleService.findAll().then(response => {
            this.vehicles = response;
        });
    }

    confirmationDelete(vehicle: VehicleEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir o Veículo?`,
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
}
