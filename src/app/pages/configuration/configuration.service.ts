import {Injectable} from '@angular/core';
import {BaseService} from "../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../core/handler/ErrorHandler";
import {ConfigurationEntity} from "../../../entity/ConfigurationEntity";
import {TypeValueEntity} from "../../../entity/TypeValueEntity";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService extends BaseService<ConfigurationEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "configurations";
    }

    async findBy(search: string): Promise<Array<ConfigurationEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/filterBy?search=${search}`, this.options());
        return this.toPromise(request);
    }

    async findAllTypesValue(): Promise<Array<TypeValueEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/types`, this.options());
        return this.toPromise(request);
    }
}
