import {Injectable} from '@angular/core';
import {BaseService} from "../../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../../core/handler/ErrorHandler";
import {PartnerEntity} from "../../../../entity/PartnerEntity";

@Injectable({
  providedIn: 'root'
})
export class PartnerService extends BaseService<PartnerEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "partners";
    }

    async findBy(search: string): Promise<Array<PartnerEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/filterBy?search=${search}`, this.options());
        return this.toPromise(request);
    }
}
