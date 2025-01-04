import {Injectable} from '@angular/core';
import {BaseService} from "../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../core/handler/ErrorHandler";
import {TransactionEntity} from "../../../entity/TransactionEntity";
import {BalanceEntity} from "../../../entity/BalanceEntity";
import {DateHelpers} from "../../../shared/DateHelpers";

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

    async balance(): Promise<BalanceEntity> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/balances`, this.options());
        return this.toPromise(request);
    }

    async remove(id: number, deleteOnlyThis: boolean) {
        const request = this.httpClient.delete(`${this.baseURL}/${this.pathURL()}/remove/${id}?deleteOnlyThis=${deleteOnlyThis}`, this.options());
        return this.toPromise(request);
    }
}
