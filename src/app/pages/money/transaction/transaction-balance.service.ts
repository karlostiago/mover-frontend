import {Injectable} from '@angular/core';
import {BaseService} from "../../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../../core/handler/ErrorHandler";
import {BalanceEntity} from "../../../../entity/BalanceEntity";
import {TransactionBalanceEntity} from "../../../../entity/TransactionBalanceEntity";

@Injectable({
  providedIn: 'root'
})
export class TransactionBalanceService extends BaseService<TransactionBalanceEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "transactions-balance";
    }

    async calculateBalances(filterURI: string): Promise<Array<TransactionBalanceEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}?filterURI=${filterURI}`, this.options());
        return this.toPromise(request);
    }
}
