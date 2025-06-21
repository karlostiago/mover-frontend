import {Component, OnInit} from '@angular/core';
import {DashboardService} from "./dashboard.service";

export class DashboardCard {
    quantity: number = 0;
    value: number = 0
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    qtdActiveContract: DashboardCard = new DashboardCard();
    qtdContractTerminated: DashboardCard = new DashboardCard();
    qtdRentalVehicles: DashboardCard = new DashboardCard();
    qtdStoppedVehicles: DashboardCard = new DashboardCard();

    cardChargeMade: DashboardCard = new DashboardCard();
    cardOverdue: DashboardCard = new DashboardCard();
    cardMaintenance: DashboardCard = new DashboardCard();

    constructor(private dashboardService: DashboardService) { }

    async ngOnInit(): Promise<void> {
        await this.contractsActive();
        await this.terminatedContracts();
        await this.rentalVehicles();
        await this.stoppedVehicles();
        await this.chargeMade();
        await this.overdue();
        await this.maintenance();
    }

    private async contractsActive() {
        this.qtdActiveContract = await this.dashboardService.contractsActive();
    }

    private async terminatedContracts() {
        this.qtdContractTerminated = await this.dashboardService.terminatedContracts();
    }

    private async rentalVehicles() {
        this.qtdRentalVehicles = await this.dashboardService.rentalVehicles();
    }

    private async stoppedVehicles() {
        this.qtdStoppedVehicles = await this.dashboardService.stoppedVehicles();
    }

    private async chargeMade() {
        this.cardChargeMade = await this.dashboardService.chargesMade();
    }

    private async overdue() {
        this.cardOverdue = await this.dashboardService.overdue();
    }

    private async maintenance() {
        this.cardMaintenance = await this.dashboardService.maintenancePerformed();
    }
}
