import {Component, OnInit} from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {LoaderService} from "../../core/loader/loader.service";

export class DashboardCard {
    description: string;
    quantity: number = 0;
    value: number = 0;
    iconPath: string;
    loading: boolean = false;
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

    cardRealizedRevenue: DashboardCard = new DashboardCard();
    cardOverdueRevenue: DashboardCard = new DashboardCard();
    cardPendingRevenue: DashboardCard = new DashboardCard();
    cardGrossRevenue: DashboardCard = new DashboardCard();

    cardRealizedExpense: DashboardCard = new DashboardCard();
    cardOverdueExpense: DashboardCard = new DashboardCard();
    cardGrossExpense: DashboardCard = new DashboardCard();
    cardPendingExpense: DashboardCard = new DashboardCard();

    cardMaintenance: DashboardCard = new DashboardCard();

    balanceInAccounts: Array<DashboardCard> = new Array<DashboardCard>();
    generalBalance: number = 0;

    invoicesByCards: Array<DashboardCard> = new Array<DashboardCard>();
    generalInvoiceValue: number = 0;
    decriptionAmount: string;

    loadingAccounts: boolean = false;
    loadingInvoices: boolean = false;

    constructor(
        private loader: LoaderService,
        private dashboardService: DashboardService) { }

    async ngOnInit(): Promise<void> {
        this.loader.automatic = false;
        this.generatedDescriptionMonth();
        void this.contractsActive();
        void this.terminatedContracts();
        void this.rentalVehicles();
        void this.stoppedVehicles();
        void this.realizedRevenue();
        void this.pendingRevenue();
        void this.overdueRevenue();
        void this.grossRevenue();
        void this.realizedExpense();
        void this.overdueExpense();
        void this.grossExpense();
        void this.pedingExpense();
        void this.balanceAccounts();
        void this.invoices();
        void this.maintenance();
        this.loader.automatic = true;
    }

    private generatedDescriptionMonth() {
        const date = new Date();
        const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
        this.decriptionAmount = capitalize(date.toLocaleString('pt-BR', { month: 'long' }));
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

    private async realizedRevenue() {
        this.cardRealizedRevenue = await this.dashboardService.realizedRevenue();
    }

    private async pendingRevenue() {
        this.cardPendingRevenue = await this.dashboardService.pendingRevenue();
    }

    private async overdueRevenue() {
        this.cardOverdueRevenue = await this.dashboardService.overdueRevenue();
    }

    private async grossRevenue() {
        this.cardGrossRevenue = await this.dashboardService.grossRevenue();
    }

    private async realizedExpense() {
        this.cardRealizedExpense = await this.dashboardService.realizedExpense();
    }

    private async overdueExpense() {
        this.cardOverdueExpense = await this.dashboardService.overdueExpense();
    }

    private async grossExpense() {
        this.cardGrossExpense = await this.dashboardService.grossExpense();
    }

    private async pedingExpense() {
        this.cardPendingExpense = await this.dashboardService.pendingExpense();
    }

    private async maintenance() {
        this.cardMaintenance = await this.dashboardService.maintenancePerformed();
    }

    private async balanceAccounts() {
        this.balanceInAccounts = await this.dashboardService.balanceInAccounts();
        this.generalBalance = this.balanceInAccounts
            .map(account => account.value)
            .reduce((total, balance) => total + balance, 0);
        this.loadingAccounts = true;
    }

    private async invoices() {
        this.invoicesByCards = await this.dashboardService.invoices();
        this.generalInvoiceValue = this.invoicesByCards
            .map(card => card.value)
            .reduce((total, balance) => total + balance, 0);
        this.loadingInvoices = true;
    }
}
