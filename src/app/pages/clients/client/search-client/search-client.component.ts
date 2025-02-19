import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../../service/AlertService";
import {ClientService} from "../client.service";
import {ClientEntity} from "../../../../../entity/ClientEntity";
import {GlobalDialogService, TypeDialog} from "../../../../../shared/service/GlobalDialogService";
import {AuthService} from "../../../../core/login/auth.service";
import {ErrorHandler} from "../../../../core/handler/ErrorHandler";

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.css']
})
export class SearchClientComponent implements OnInit {
    clients = new Array<ClientEntity>();

    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private globalDialogService: GlobalDialogService,
                protected authService: AuthService,
                private error: ErrorHandler,
                private clientService: ClientService) {
    }

    async ngOnInit() {
        this.clientService.findAll().then(response => {
            this.clients = response;
        });
    }

    confirmationDelete(client: ClientEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir o cliente ${client['name']}?`,
            accept: () => {
                this.delete(client.id);
            }
        })
    }

    delete(id: number) {
        this.clientService.delete(id).then(() => {
            this.clients = this.clients.filter(a => a.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    showDialogAddress(client: ClientEntity) {
        if (this.authService.hasPermission('VIEW_ADDRESS_CLIENTS')) {
            this.globalDialogService.openDialog(TypeDialog.ADDRESS, client);
        } else {
            this.error.capture({ status: 403 })
        }
    }

    filterBy() {
        this.clientService.findBy(this.searchFilter).then(response => {
            this.clients = response;
            this.table?.reset();
        })
    }
}
