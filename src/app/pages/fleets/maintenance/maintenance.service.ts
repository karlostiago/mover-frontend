import {Injectable} from '@angular/core';
import {BaseService} from "../../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../../core/handler/ErrorHandler";
import {MaintenanceEntity} from "../../../../entity/MaintenanceEntity";
import {MaintenanceTypeEntity} from "../../../../entity/MaintenanceTypeEntity";

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService extends BaseService<MaintenanceEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "maintenance";
    }

    async findBy(search: string): Promise<Array<MaintenanceEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/filterBy?search=${search}`, this.options());
        return this.toPromise(request);
    }

    async findAllTypes(): Promise<Array<MaintenanceTypeEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/types`, this.options());
        return this.toPromise(request);
    }
}
