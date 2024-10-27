import {Injectable} from '@angular/core';
import {BaseService} from "../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../core/handler/ErrorHandler";
import {VehicleEntity} from "../../../entity/VehicleEntity";
import {FuelTypeEntity} from "../../../entity/FuelTypeEntity";
import {SituationEntity} from "../../../entity/SituationEntity";

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends BaseService<VehicleEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "vehicles";
    }

    async findBy(search: string): Promise<Array<VehicleEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/findBy?search=${search}`, this.options());
        return this.toPromise(request);
    }

    async findAllFuelTypes(): Promise<Array<FuelTypeEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/fuel-type`, this.options());
        return this.toPromise(request);
    }

    async findAllSituation(): Promise<Array<SituationEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/situation`, this.options());
        return this.toPromise(request);
    }

    async onlyAvailable(): Promise<Array<VehicleEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/only-available`, this.options());
        return this.toPromise(request);
    }
}
