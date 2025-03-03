import {Injectable} from "@angular/core";
import {AlertService} from "../../../shared/service/AlertService";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ErrorHandler {

    private sessionExpired = false;
    private serverError = false;
    private serverRestarted = false;

    constructor(private alertService: AlertService,
                private router: Router) { }

    capture(errorResponse: any) {
        const { status, error } = errorResponse;

        switch (status) {
            case 0:
                this.handleServerError();
                return;

            case 403:
                this.alertService.error('Autorização de acesso negado para essa funcionalidade.');
                void this.router.navigate(['/forbidden']);
                return;

            case 498:
                this.handleSessionExpired();
                return;

            case 503:
                this.handleServerRestarted();
                return;

            default:
                this.handleErrorMessages(error);
                return;
        }
    }

    private handleServerRestarted() {
        if (this.serverRestarted) {
            return;
        }

        this.serverRestarted = true;

        this.alertService.error('O servidor foi reiniciado recentemente e sua sessão foi encerrada por motivos de segurança. Você será redirecionado para a tela de login para continuar.');
        this.redirectToLogin();
    }

    private handleServerError() {
        if (this.serverError) {
            return;
        }

        this.serverError = true;

        this.alertService.error('Falha na conexão com o servidor. O serviço está temporariamente indisponível. Você será redirecionado para a tela de login enquanto restabelecemos a conexão. Por favor, aguarde alguns minutos e tente novamente.');
        this.redirectToLogin();
    }

    private handleSessionExpired() {
        if (this.sessionExpired) {
            return;
        }

        this.sessionExpired = true;

        this.alertService.error('Sua sessão foi encerrada. Por motivos de segurança, você precisa fazer login novamente para continua.');
        this.redirectToLogin();
    }

    private handleErrorMessages(errors: any) {
        if (!Array.isArray(errors)) {
            this.alertService.error('Ocorreu um erro não tratado.');
            return;
        }

        errors.forEach(( { severity, message }) => {
            switch (severity) {
                case 'WARNING':
                    this.alertService.warning(message)
                    break;
                case 'INFO':
                    this.alertService.info(message);
                    break;
                default:
                    this.alertService.error(message);
                    break;
            }
        });
    }

    private redirectToLogin() {
        setTimeout(() => {
            void this.router.navigate(['/login']);
            this.sessionExpired = false;
            this.serverError = false;
            this.serverRestarted = false;
        }, 4000);
    }
}
