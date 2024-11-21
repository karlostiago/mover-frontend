import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../service/AlertService";
import {HistoryfipeService} from "../historyfipe.service";
import {Table} from "primeng/table";
import {VehicleEntity} from "../../../../entity/VehicleEntity";
import {VehicleService} from "../../vehicle/vehicle.service";
import {HistoryFipeEntity} from "../../../../entity/HistoryFipeEntity";

@Component({
  selector: 'app-search-historyfipe',
  templateUrl: './search-historyfipe.component.html',
  styleUrls: ['./search-historyfipe.component.css']
})
export class SearchHistoryfipeComponent implements OnInit {

    vehicles = new Array<VehicleEntity>();
    histories = new Array<HistoryFipeEntity>();
    selectedVehicle: number;

    researched: boolean = false;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private vehicleService: VehicleService,
                private historyFipeService: HistoryfipeService) {
    }

    async ngOnInit() {
        await this.loadingAllVehicles();
        this.historyFipeService.history(this.selectedVehicle).then(response => {
            this.histories = response;
        });
    }

    search() {
        this.historyFipeService.history(this.selectedVehicle).then(response => {
            this.histories = response;
            this.researched = true;
        });
    }

    private async loadingAllVehicles() {
        this.vehicleService.findAll().then(response => {
            this.vehicles = response;
        });
    }
}
