import {Injectable} from '@angular/core';
import {BaseService} from "../../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../../core/handler/ErrorHandler";
import {BalanceEntity} from "../../../../entity/BalanceEntity";

@Injectable({
  providedIn: 'root'
})
export class BalanceService extends BaseService<BalanceEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "balances";
    }

    async calculateBalances(filterURI: string): Promise<BalanceEntity> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}?filterURI=${filterURI}`, this.options());
        return this.toPromise(request);
    }
}
