import {Injectable} from '@angular/core';
import {BaseService} from "../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../core/handler/ErrorHandler";
import {TransactionEntity} from "../../../entity/TransactionEntity";

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService<TransactionEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "transactions";
    }

    async findBy(search: string): Promise<Array<TransactionEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/filterBy?search=${search}`, this.options());
        return this.toPromise(request);
    }

    async findAllTypes(): Promise<Array<TransactionEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/types`, this.options());
        return this.toPromise(request);
    }
}
