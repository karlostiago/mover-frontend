import {Injectable} from '@angular/core';
import {BaseService} from "../../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../../core/handler/ErrorHandler";
import {AccountEntity} from "../../../../entity/AccountEntity";
import {BankIconEntity} from "../../../../entity/BankIconEntity";

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService<AccountEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "accounts";
    }

    async findAllIcons(): Promise<Array<BankIconEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/icons`, this.options());
        return this.toPromise(request);
    }

    async findBy(search: string): Promise<Array<AccountEntity>> {
        console.log(search)
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/filterBy?search=${search}`, this.options());
        return this.toPromise(request);
    }
}
