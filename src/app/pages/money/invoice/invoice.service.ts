import {Injectable} from '@angular/core';
import {BaseService} from "../../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../../core/handler/ErrorHandler";
import {TransactionEntity} from "../../../../entity/TransactionEntity";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BaseService<TransactionEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "invoices";
    }

    async searchInvoice(invoiceId: number): Promise<Array<TransactionEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/invoice/${invoiceId}`, this.options());
        return this.toPromise(request);
    }
}
