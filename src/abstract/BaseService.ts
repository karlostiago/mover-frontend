import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {ErrorHandler} from "../app/core/handler/ErrorHandler";

export abstract class BaseService<T> {

    protected baseURL = environment.apiUrl;

    protected constructor(
        protected httpClient: HttpClient,
        protected errorHandler: ErrorHandler) { }

    protected abstract pathURL(): string;

    async save(entity: T): Promise<T> {
        const request = this.httpClient.post(`${this.baseURL}/${this.pathURL()}`, JSON.stringify(entity), this.options());
        return this.toPromise(request);
    }

    async update(id: number, entity: T): Promise<T> {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/${id}`, JSON.stringify(entity), this.options());
        return this.toPromise(request);
    }

    async delete(id: number) {
        const request = this.httpClient.delete(`${this.baseURL}/${this.pathURL()}/${id}`, this.options());
        return this.toPromise(request);
    }

    async findById(id: number): Promise<T> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/${id}`, this.options());
        return this.toPromise(request);
    }

    async findAll(): Promise<Array<T>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}`, this.options());
        return this.toPromise(request);
    }

    options(httpParams: HttpParams = new HttpParams()) {
        return {
            headers: this.headers(),
            httpParams
        }
    }

    headers(): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        return headers;
    }

    toPromise<T>(request: Observable<Object>): Promise<T> {
        return new Promise((resolve) => {
            request.subscribe({
                next: (data) => {
                    resolve(data as T);
                },
                error: (error) => {
                    this.errorHandler.capture(error);
                }
            })
        })
    }
}
