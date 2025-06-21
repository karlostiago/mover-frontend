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

    async chargesMade(): Promise<DashboardCard> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/charges-made`, this.options());
        return this.toPromise(request);
    }

    async overdue(): Promise<DashboardCard> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/overdue-charges`, this.options());
        return this.toPromise(request);
    }

    async maintenancePerformed(): Promise<DashboardCard> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/maintenance-performed`, this.options());
        return this.toPromise(request);
    }
}
