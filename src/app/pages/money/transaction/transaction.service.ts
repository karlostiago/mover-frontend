import {Injectable} from '@angular/core';
import {BaseService} from "../../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../../core/handler/ErrorHandler";
import {TransactionEntity} from "../../../../entity/TransactionEntity";
import {DateHelpers} from "../../../../shared/DateHelpers";

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

    async pay(id: number, paymentDate: Date): Promise<TransactionEntity> {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/${id}/pay/${DateHelpers.toISOToString(paymentDate)}`, this.options());
        return this.toPromise(request);
    }

    async refund(id: number): Promise<TransactionEntity> {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/${id}/refund`, this.options());
        return this.toPromise(request);
    }

    async batchDelete(id: number) {
        const request = this.httpClient.delete(`${this.baseURL}/${this.pathURL()}/batch-delete/${id}`, this.options());
        return this.toPromise(request);
    }

    async batchUpdate(id: number, entity: TransactionEntity) {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/batch-update/${id}`, JSON.stringify(entity), this.options());
        return this.toPromise(request);
    }
}
