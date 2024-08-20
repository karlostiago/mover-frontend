import {Injectable} from '@angular/core';
import {AbstractService} from "../../../abstract/AbstractService";
import {ModelEntity} from "../../../entity/ModelEntity";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../core/handler/ErrorHandler";
import {VehicleEntity} from "../../../entity/VehicleEntity";
import {FuelTypeEntity} from "../../../entity/FuelTypeEntity";
import {SituationEntity} from "../../../entity/SituationEntity";

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends AbstractService<VehicleEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "vehicles";
    }

    async findBy(search: string): Promise<Array<ModelEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/filterBy?search=${search}`, this.options());
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
}