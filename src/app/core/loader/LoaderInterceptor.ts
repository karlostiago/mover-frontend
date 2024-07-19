import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {finalize, Observable} from "rxjs";
import {LoaderService} from "./loader.service";

@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {

    constructor(public loaderService: LoaderService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.loaderService.automatic) {
            this.loaderService.show();
        }

        return next.handle(req).pipe(finalize(() => this.loaderService.hide()));
    }

}
