import {Injectable} from '@angular/core';
import {BaseService} from "../../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../../core/handler/ErrorHandler";
import {SubCategoryEntity} from "../../../../entity/SubCategoryEntity";

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService extends BaseService<SubCategoryEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "subcategories";
    }

    async findBy(search: string): Promise<Array<SubCategoryEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/findBy?search=${search}`, this.options());
        return this.toPromise(request);
    }
}
