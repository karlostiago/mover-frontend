import {Injectable} from '@angular/core';
import {BaseService} from "../../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../../core/handler/ErrorHandler";
import {TransactionEntity} from "../../../../entity/TransactionEntity";
import {DateHelpers} from "../../../../shared/DateHelpers";
import {InvoicePaymentDetailEntity} from "../../../../entity/InvoicePaymentDetailEntity";

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

    async schedule(id: number): Promise<TransactionEntity> {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/${id}/schedule`, this.options());
        return this.toPromise(request);
    }

    async undoScheduling(id: number): Promise<TransactionEntity> {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/${id}/undo-scheduling`, this.options());
        return this.toPromise(request);
    }

    async pay(entity: TransactionEntity, paymentDate: Date): Promise<TransactionEntity> {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/${entity.id}/pay/${DateHelpers.toISOToString(paymentDate)}`, JSON.stringify(entity), this.options());
        return this.toPromise(request);
    }

    async refund(id: number): Promise<TransactionEntity> {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/${id}/refund`, this.options());
        return this.toPromise(request);
    }

    async invoicePaymentDetail(id: number): Promise<Array<InvoicePaymentDetailEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/${id}/invoice-payment-detail`, this.options());
        return this.toPromise(request);
    }
}
