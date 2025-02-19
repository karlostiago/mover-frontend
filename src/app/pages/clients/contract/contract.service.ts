import {Injectable} from '@angular/core';
import {BaseService} from "../../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../../core/handler/ErrorHandler";
import {ContractEntity} from "../../../../entity/ContractEntity";
import {PaymentFrequencyEntity} from "../../../../entity/PaymentFrequencyEntity";

@Injectable({
  providedIn: 'root'
})
export class ContractService extends BaseService<ContractEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "contracts";
    }

    async findBy(search: string): Promise<Array<ContractEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/filterBy?search=${search}`, this.options());
        return this.toPromise(request);
    }

    async findAllPaymentFrequencies(): Promise<Array<PaymentFrequencyEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/payment-frequencies`, this.options());
        return this.toPromise(request);
    }

    async findAllSituations(): Promise<Array<PaymentFrequencyEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/situations`, this.options());
        return this.toPromise(request);
    }

    async findAllDaysOfWeek(): Promise<Array<PaymentFrequencyEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/days-of-week`, this.options());
        return this.toPromise(request);
    }

    async generatedNewContractWithSequence(): Promise<ContractEntity> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/generated-new-contract-with-sequence`, this.options());
        return this.toPromise(request);
    }

    async close(contract: ContractEntity): Promise<ContractEntity> {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/${contract.id}/close`, JSON.stringify(contract), this.options());
        return this.toPromise(request);
    }
}
