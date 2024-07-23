import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private messageService: MessageService) { }

    success(message: string) {
        this.build(message, 'success', 'Sucesso');
    }

    error(message: string) {
        this.build(message, 'error', 'Error');
    }

    warning(message: string) {
        this.build(message, 'warn', 'Atenção');
    }

    info(message: string) {
        this.build(message, 'info', 'Info');
    }

    private build(message: string, severity: string, summary: string) {
        this.messageService.add({
            severity: severity,
            summary: summary,
            detail: message
        });
    }
}
