import {Injectable} from '@angular/core';
import {BaseService} from "../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../core/handler/ErrorHandler";
import {FipeEntity} from "../../../entity/FipeEntity";
import {SummaryFipeEntity} from "../../../entity/SummaryFipeEntity";

@Injectable({
  providedIn: 'root'
})
export class FipeService extends BaseService<FipeEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "fipe";
    }

    async calculated(brand: string, model: string, modelYear: number, fuelType: string | null, dateReference: Date): Promise<FipeEntity> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/calculated/brand/${brand}/modelYear/${modelYear}?fuelType=${fuelType}&model=${model}&reference=${dateReference}`, this.options());
        return this.toPromise(request);
    }

    async findByVehicleId(id: number): Promise<SummaryFipeEntity> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/find-by/vehicleId/${id}`, this.options());
        return this.toPromise(request);
    }
}
