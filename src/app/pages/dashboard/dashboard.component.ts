import {Component, OnInit} from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {LoaderService} from "../../core/loader/loader.service";

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';

Chart.register(ChartDataLabels);

export class DashboardCard {
    description: string;
    quantity: number = 0;
    value: number = 0;
    iconPath: string;
    loading: boolean = false;
}

export class DashboardChartDoughnut {
    labels: Array<string>;
    values: Array<number>;
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

    balanceInAccounts: Array<DashboardCard> = new Array<DashboardCard>();
    generalBalance: number = 0;

    invoicesByCards: Array<DashboardCard> = new Array<DashboardCard>();
    generalInvoiceValue: number = 0;
    decriptionAmount: string;

    loadingAccounts: boolean = false;
    loadingInvoices: boolean = false;

    basicIncomeData: any;
    basicIncomeOptions: any;
    loadingChartIncome: boolean = false;

    basicExpenseData: any;
    basicExpenseOptions: any;
    loadingChartExpense: boolean = false;

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
        void this.chartRecipeCategory();
        void this.chartExpenseCategory();
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

    private async chartRecipeCategory() {
        this.dashboardService.recipeChartCategory().then(response => {
            this.basicIncomeData = this.chartDoughnutData(response.labels, response.values);
            this.basicIncomeOptions = this.chartDoughnutOptions();
            this.loadingChartIncome = true;
        });
    }

    private async chartExpenseCategory() {
        this.dashboardService.expenseChartCategory().then(response => {
            this.basicExpenseData = this.chartDoughnutData(response.labels, response.values);
            this.basicExpenseOptions = this.chartDoughnutOptions();
            this.loadingChartExpense = true;
        });
    }

    private chartDoughnutData(labels: Array<string>, values: Array<number>) {
        return {
            labels: labels,
            datasets: [
                {
                    data: values
                }
            ]
        };
    }

    private chartDoughnutOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            layout: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'left',
                    align: 'start',
                    labels: {
                        boxWidth: 20,
                        color: '#495057',
                        padding: 10,
                        usePointStyle: true
                    }
                },
                datalabels: {
                    display: false,
                    color: '#757575',
                    anchor: 'end',
                    align: 'end',
                    offset: 5,
                    formatter: (value: any, context: any) => {
                        const label = context.chart.data.labels?.[context.dataIndex] || '';
                        const formattedValue = new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }).format(value);
                        return [label, formattedValue];
                    },
                    font: {
                        weight: 'bold'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem: any) => {
                            const value = tooltipItem.raw || 0;
                            const formattedValue = new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }).format(value);
                            return `${formattedValue}`;
                        }
                    }
                }
            }
        };
    }
}
