import {Injectable} from '@angular/core';
import {BaseService} from "../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../core/handler/ErrorHandler";
import {CategoryEntity} from "../../../entity/CategoryEntity";
import {CategoryTypeEntity} from "../../../entity/CategoryTypeEntity";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<CategoryEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "categories";
    }

    async findBy(search: string): Promise<Array<CategoryEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/findBy?search=${search}`, this.options());
        return this.toPromise(request);
    }

    async findAllTypes(): Promise<Array<CategoryTypeEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/types`, this.options());
        return this.toPromise(request);
    }

    async findCategoryByTypes(type: string): Promise<Array<CategoryEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/find-type-category?type=${type}`, this.options());
        return this.toPromise(request);
    }
}
