import { Injectable } from '@angular/core';
import {AbstractService} from "../../../abstract/AbstractService";
import {BrandEntity} from "../../../entity/BrandEntity";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BrandService extends AbstractService<BrandEntity> {

    constructor(private httpClient: HttpClient) {
        super();
    }

    protected pathURL(): string {
        return "brands";
    }

    async save(brand: BrandEntity): Promise<BrandEntity> {
        const request = this.httpClient.post(`${this.baseURL}/${this.pathURL()}`, JSON.stringify(brand), this.options());
        return this.toPromise(request);
    }

    async update(brand: BrandEntity): Promise<BrandEntity> {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/${brand.id}`, JSON.stringify(brand), this.options());
        return this.toPromise(request);
    }

    async delete(id: number) {
        const request = this.httpClient.delete(`${this.baseURL}/${this.pathURL()}/${id}`, this.options());
        return this.toPromise(request);
    }

    async findById(id: number): Promise<BrandEntity> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/${id}`, this.options());
        return this.toPromise(request);
    }

    async findAll(): Promise<Array<BrandEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}`, this.options());
        return this.toPromise(request);
    }
}
