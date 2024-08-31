import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountEntity} from "../../../../entity/AccountEntity";
import {Table} from "primeng/table";
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../service/AlertService";
import {ClientService} from "../client.service";
import {BankIconEntity} from "../../../../entity/BankIconEntity";

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.css']
})
export class SearchClientComponent implements OnInit {
    accounts = new Array<AccountEntity>();
    icons = new Array<BankIconEntity>();

    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private accountService: ClientService) {
    }

    async ngOnInit() {
        await this.loadingIcons();
        console.log(this.icons);
        this.accountService.findAll().then(response => {
            this.accounts = response;
        });
    }

    confirmationDelete(account: AccountEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir a Conta?`,
            accept: () => {
                this.delete(account.id);
            }
        })
    }

    delete(id: number) {
        this.accountService.delete(id).then(() => {
            this.accounts = this.accounts.filter(a => a.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.accountService.findBy(this.searchFilter).then(response => {
            this.accounts = response;
            this.table?.reset();
        })
    }

    private async loadingIcons() {
        const icons = await this.accountService.findAllIcons();
        for (const icon of icons) {
            this.icons.push(icon);
        }
    }
}
