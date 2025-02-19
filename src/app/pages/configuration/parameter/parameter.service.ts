import {Injectable} from '@angular/core';
import {BaseService} from "../../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../../core/handler/ErrorHandler";
import {ParameterEntity} from "../../../../entity/ParameterEntity";
import {TypeValueEntity} from "../../../../entity/TypeValueEntity";

@Injectable({
  providedIn: 'root'
})
export class ParameterService extends BaseService<ParameterEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "parameters";
    }

    async findBy(search: string): Promise<Array<ParameterEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/filterBy?search=${search}`, this.options());
        return this.toPromise(request);
    }

    async findAllTypesValue(): Promise<Array<TypeValueEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/types`, this.options());
        return this.toPromise(request);
    }
}
