import {Injectable} from "@angular/core";
import {BaseService} from "../abstract/BaseService";
import {HealthCheckEntity} from "../entity/HealthCheckEntity";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../app/core/handler/ErrorHandler";

@Injectable({
    providedIn: 'root'
})
export class HealthCheckService extends BaseService<HealthCheckEntity>{

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "health";
    }

    async isRunning(): Promise<HealthCheckEntity> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}`, this.options());
        return this.toPromise(request);
    }
}
