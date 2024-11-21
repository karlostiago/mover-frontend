import {Injectable} from '@angular/core';
import {BaseService} from "../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../core/handler/ErrorHandler";
import {HistoryFipeEntity} from "../../../entity/HistoryFipeEntity";

@Injectable({
  providedIn: 'root'
})
export class HistoryfipeService extends BaseService<HistoryFipeEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "fipe";
    }

    async history(vehicleId: number = -1): Promise<Array<HistoryFipeEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/${vehicleId}/history`, this.options());
        return this.toPromise(request);
    }
}
