import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../service/AlertService";
import {VehicleService} from "../vehicle.service";

@Component({
  selector: 'app-search-vehicle',
  templateUrl: './search-vehicle.component.html',
  styleUrls: ['./search-vehicle.component.css']
})
export class SearchVehicleComponent implements OnInit {

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private modelService: VehicleService) {
    }

    ngOnInit(): void {

    }
}
