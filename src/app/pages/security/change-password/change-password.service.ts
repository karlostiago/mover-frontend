import {Injectable} from '@angular/core';
import {BaseService} from "../../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../../core/handler/ErrorHandler";
import {UserEntity} from "../../../../entity/UserEntity";

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService extends BaseService<UserEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "changepasswords";
    }

    async changePassword(user: UserEntity): Promise<Array<UserEntity>> {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/changepassword`, JSON.stringify(user), this.options());
        return this.toPromise(request);
    }
}
