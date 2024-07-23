import {Injectable} from '@angular/core';
import {AbstractService} from "../../../abstract/AbstractService";
import {HttpClient} from "@angular/common/http";
import {SymbolEntity} from "../../../entity/SymbolEntity";
import {ErrorHandler} from "../../core/handler/ErrorHandler";

@Injectable({
  providedIn: 'root'
})
export class SymbolService extends AbstractService<SymbolEntity> {

    constructor(private httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(errorHandler);
    }

    protected pathURL(): string {
        return "symbols";
    }

    async findAll(): Promise<Array<SymbolEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}`, this.options());
        return this.toPromise(request);
    }
}
