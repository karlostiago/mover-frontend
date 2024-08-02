import {Injectable} from '@angular/core';
import {AbstractService} from "../../../abstract/AbstractService";
import {ModelEntity} from "../../../entity/ModelEntity";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../core/handler/ErrorHandler";
import {BrandEntity} from "../../../entity/BrandEntity";

@Injectable({
  providedIn: 'root'
})
export class ModelService extends AbstractService<ModelEntity> {

    constructor(private httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(errorHandler);
    }

    protected pathURL(): string {
        return "models";
    }

    async save(model: ModelEntity): Promise<BrandEntity> {
        const request = this.httpClient.post(`${this.baseURL}/${this.pathURL()}`, JSON.stringify(model), this.options());
        return this.toPromise(request);
    }

    async update(model: ModelEntity): Promise<BrandEntity> {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/${model.id}`, JSON.stringify(model), this.options());
        return this.toPromise(request);
    }

    async findById(id: number): Promise<ModelEntity> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/${id}`, this.options());
        return this.toPromise(request);
    }

    async delete(id: number) {
        const request = this.httpClient.delete(`${this.baseURL}/${this.pathURL()}/${id}`, this.options());
        return this.toPromise(request);
    }

    async findAll(): Promise<Array<ModelEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}`, this.options());
        return this.toPromise(request);
    }
}
