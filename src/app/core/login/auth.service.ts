import {Injectable} from '@angular/core';
import {BaseService} from "../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../handler/ErrorHandler";
import {AuthEntity} from "../../../entity/AuthEntity";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<AuthEntity> {

    constructor(override httpClient: HttpClient,  override errorHandler: ErrorHandler) {
        super(httpClient, errorHandler);
    }

    protected pathURL(): string {
        return "auth";
    }

    async login(entity: AuthEntity): Promise<AuthEntity> {
        const request = this.httpClient.post(`${this.baseURL}/${this.pathURL()}/login`, JSON.stringify(entity), this.options());
        return this.toPromise(request);
    }

    async getToken(): Promise<string | null> {
        return localStorage.getItem('APP_TOKEN') || null;
    }

    async isLoggedIn(): Promise<boolean> {
        return await this.getToken().then(response => {
            return response !== null;
        });
    }
}
