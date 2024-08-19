import {Injectable} from '@angular/core';
import {AbstractService} from "../../../abstract/AbstractService";
import {BrandEntity} from "../../../entity/BrandEntity";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../core/handler/ErrorHandler";

@Injectable({
  providedIn: 'root'
})
export class BrandService extends AbstractService<BrandEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "brands";
    }

    async findByName(name: string): Promise<Array<BrandEntity>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/filterBy?name=${name}`, this.options());
        return this.toPromise(request);
    }
}
