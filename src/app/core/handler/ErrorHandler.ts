import {Injectable} from "@angular/core";
import {AlertService} from "../../../service/AlertService";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ErrorHandler {

    constructor(private alertService: AlertService,
                private router: Router) { }

    capture(errorResponse: any) {
        if (errorResponse.status === 0) {
            this.alertService.error('Erro ao se conectar ao servidor. O servidor esta temporariamente fora do ar, por gentileza aguarde uns minutos e tente novamente mais tarde.');
            this.router.navigate(['/login']).then(() => {});
        } else {
            for (const error of errorResponse.error) {
                if (error['severity'] === 'WARNING') {
                    this.alertService.warning(error['message']);
                } else if (error['severity'] === 'INFO') {
                    this.alertService.info(error['message']);
                } else {
                    this.alertService.error(error['message']);
                }
            }
        }
    }
}
