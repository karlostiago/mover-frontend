import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {from, mergeMap, Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(public authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.authService.getToken()).pipe(
            mergeMap(token => {
                if (token) {
                    req = req.clone({
                        setHeaders: { Authorization: `Bearer ${token}` }
                    });
                }
                return next.handle(req);
            })
        );
    }
}
