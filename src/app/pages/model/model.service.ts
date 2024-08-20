import {Injectable} from '@angular/core';
import {AbstractService} from "../../../abstract/AbstractService";
import {ModelEntity} from "../../../entity/ModelEntity";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../core/handler/ErrorHandler";

@Injectable({
  providedIn: 'root'
})
export class ModelService extends AbstractService<ModelEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "models";
    }

    async findBy(search: string): Promise<Array<ModelEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/filterBy?search=${search}`, this.options());
        return this.toPromise(request);
    }

    async findByBrandId(brandId: number): Promise<Array<ModelEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/find-by-brand-id?brandId=${brandId}`, this.options());
        return this.toPromise(request);
    }
}
