import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountEntity} from "../../../../entity/AccountEntity";
import {Table} from "primeng/table";
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../service/AlertService";
import {AccountService} from "../account.service";
import {BankIconEntity} from "../../../../entity/BankIconEntity";
import {AuthService} from "../../../core/login/auth.service";

@Component({
  selector: 'app-search-account',
  templateUrl: './search-account.component.html',
  styleUrls: ['./search-account.component.css']
})
export class SearchAccountComponent implements OnInit {
    accounts = new Array<AccountEntity>();
    icons = new Array<BankIconEntity>();

    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                protected authService: AuthService,
                private accountService: AccountService) {
    }

    async ngOnInit() {
        await this.loadingIcons();
        this.accountService.findAll().then(response => {
            this.accounts = response;
        });
    }

    confirmationDelete(account: AccountEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir a conta ${account['name']}?`,
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
