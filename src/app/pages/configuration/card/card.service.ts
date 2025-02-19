import {Injectable} from '@angular/core';
import {BaseService} from "../../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../../core/handler/ErrorHandler";
import {BankIconEntity} from "../../../../entity/BankIconEntity";
import {CardEntity} from "../../../../entity/CardEntity";

@Injectable({
  providedIn: 'root'
})
export class CardService extends BaseService<CardEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "cards";
    }

    async findAllIcons(): Promise<Array<BankIconEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/icons`, this.options());
        return this.toPromise(request);
    }

    async findBy(search: string): Promise<Array<CardEntity>> {
        console.log(search)
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/filterBy?search=${search}`, this.options());
        return this.toPromise(request);
    }
}
