import {Injectable} from '@angular/core';
import {AbstractService} from "../../../abstract/AbstractService";
import {HttpClient} from "@angular/common/http";
import {SymbolEntity} from "../../../entity/SymbolEntity";
import {ErrorHandler} from "../../core/handler/ErrorHandler";

@Injectable({
  providedIn: 'root'
})
export class SymbolService extends AbstractService<SymbolEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "symbols";
    }
}
