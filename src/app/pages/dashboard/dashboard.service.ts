import {Injectable} from '@angular/core';
import {BaseService} from "../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../core/handler/ErrorHandler";
import {DashboardCard} from "./dashboard.component";


@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService<any> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "dashboard";
    }

    async contractsActive(): Promise<DashboardCard> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/contracts-active`, this.options());
        return this.toPromise(request);
    }

    async terminatedContracts(): Promise<DashboardCard> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/terminated-contracts`, this.options());
        return this.toPromise(request);
    }

    async rentalVehicles(): Promise<DashboardCard> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/rental-vehicles`, this.options());
        return this.toPromise(request);
    }

    async stoppedVehicles(): Promise<DashboardCard> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/stopped-vehicles`, this.options());
        return this.toPromise(request);
    }

    async realizedRevenue(): Promise<DashboardCard> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/realized-revenue`, this.options());
        return this.toPromise(request);
    }

    async pendingRevenue(): Promise<DashboardCard> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/pending-revenue`, this.options());
        return this.toPromise(request);
    }

    async grossRevenue(): Promise<DashboardCard> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/gross-revenue`, this.options());
        return this.toPromise(request);
    }

    async overdueRevenue(): Promise<DashboardCard> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/overdue-revenue`, this.options());
        return this.toPromise(request);
    }

    async realizedExpense(): Promise<DashboardCard> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/realized-expense`, this.options());
        return this.toPromise(request);
    }

    async overdueExpense(): Promise<DashboardCard> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/overdue-expense`, this.options());
        return this.toPromise(request);
    }

    async pendingExpense(): Promise<DashboardCard> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/pending-expense`, this.options());
        return this.toPromise(request);
    }

    async grossExpense(): Promise<DashboardCard> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/gross-expense`, this.options());
        return this.toPromise(request);
    }

    async balanceInAccounts(): Promise<Array<DashboardCard>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/balance-accounts`, this.options());
        return this.toPromise(request);
    }

    async invoices(): Promise<Array<DashboardCard>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/invoices`, this.options());
        return this.toPromise(request);
    }

    async maintenancePerformed(): Promise<DashboardCard> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/maintenance-performed`, this.options());
        return this.toPromise(request);
    }
}
