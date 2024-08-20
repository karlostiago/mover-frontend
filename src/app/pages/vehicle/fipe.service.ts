import {Injectable} from '@angular/core';
import {AbstractService} from "../../../abstract/AbstractService";
import {ModelEntity} from "../../../entity/ModelEntity";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../core/handler/ErrorHandler";
import {VehicleEntity} from "../../../entity/VehicleEntity";
import {FuelTypeEntity} from "../../../entity/FuelTypeEntity";
import {FipeEntity} from "../../../entity/FipeEntity";

@Injectable({
  providedIn: 'root'
})
export class FipeService extends AbstractService<FipeEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "fipe";
    }

    async calculated(brand: string, model: string, modelYear: number): Promise<FipeEntity> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/calculated/brand/${brand}/model/${model}/modelYear/${modelYear}`, this.options());
        return this.toPromise(request);
    }

    async findBy(search: string): Promise<Array<ModelEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/filterBy?search=${search}`, this.options());
        return this.toPromise(request);
    }

    async findFuelTypes(): Promise<Array<FuelTypeEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/fuel-type`, this.options());
        return this.toPromise(request);
    }
}
