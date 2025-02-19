import {Injectable} from '@angular/core';
import {BaseService} from "../../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../../core/handler/ErrorHandler";
import {TypePersonEntity} from "../../../../entity/TypePersonEntity";
import {BrazilianStatesEntity} from "../../../../entity/BrazilianStatesEntity";
import {ClientEntity} from "../../../../entity/ClientEntity";

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService<ClientEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "clients";
    }

    async findAllTypes(): Promise<Array<TypePersonEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/types-person`, this.options());
        return this.toPromise(request);
    }

    async findAllBrazilianStates(): Promise<Array<BrazilianStatesEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/brazilian-states`, this.options());
        return this.toPromise(request);
    }

    async findAddress(postalCode: number): Promise<ClientEntity> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/addrees/${postalCode}`, this.options());
        return this.toPromise(request);
    }

    async findBy(search: string): Promise<Array<ClientEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/filterBy?search=${search}`, this.options());
        return this.toPromise(request);
    }

    async onlyAvailable(): Promise<Array<ClientEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/only-available`, this.options());
        return this.toPromise(request);
    }
}
