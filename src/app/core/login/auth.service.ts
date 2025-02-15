import {Injectable} from '@angular/core';
import {BaseService} from "../../../abstract/BaseService";
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../handler/ErrorHandler";
import {AuthEntity} from "../../../entity/AuthEntity";

import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<AuthEntity> {

    private permissions: string [] = [];

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

    async getExpiration(): Promise<boolean> {
        const timestamp = localStorage.getItem('APP_TOKEN_EXPIRATION');
        return timestamp ? Number(timestamp) < Date.now() : true;
    }

    async isLoggedIn(): Promise<boolean> {
        const token = await this.getToken();
        const expiration = await this.getExpiration();
        return !!(token && !expiration);
    }

    async loadingPermissions() {
        await this.getToken().then(response => {
            if (response) {
                const decode: any = jwtDecode(response);
                this.permissions = decode.permissions || [];
            }
        });
    }

    hasPermission(permission: string): boolean {
        if (this.permissions.length === 0) {
            this.loadingPermissions().then(() => { });
        }
        return this.permissions.includes(`ROLE_${permission}`);
    }
}
