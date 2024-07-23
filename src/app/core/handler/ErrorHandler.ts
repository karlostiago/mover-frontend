import {Injectable} from "@angular/core";
import {AlertService} from "../../../service/AlertService";

@Injectable({
    providedIn: 'root'
})
export class ErrorHandler {

    constructor(private alertService: AlertService) { }

    capture(errorResponse: any) {
        console.log(errorResponse);
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
