import {Injectable} from '@angular/core';
import {AbstractService} from "../../../abstract/AbstractService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../core/handler/ErrorHandler";
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

    async calculated(brand: string, model: string, modelYear: number, fuelType: string | null): Promise<FipeEntity> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/calculated/brand/${brand}/model/${model}/modelYear/${modelYear}/fuelType/${fuelType}`, this.options());
        return this.toPromise(request);
    }
}
