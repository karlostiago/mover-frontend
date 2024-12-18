import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountEntity} from "../../../../entity/AccountEntity";
import {Table} from "primeng/table";
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../service/AlertService";
import {ClientService} from "../client.service";
import {ClientEntity} from "../../../../entity/ClientEntity";
import {GlobalDialogService, TypeDialog} from "../../../../shared/service/GlobalDialogService";

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
                private clientService: ClientService) {
    }

    async ngOnInit() {
        this.clientService.findAll().then(response => {
            this.clients = response;
        });
    }

    confirmationDelete(account: AccountEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir o Cliente?`,
            accept: () => {
                this.delete(account.id);
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
        this.globalDialogService.openDialog(TypeDialog.ADDRESS, client);
    }

    filterBy() {
        this.clientService.findBy(this.searchFilter).then(response => {
            this.clients = response;
            this.table?.reset();
        })
    }
}
