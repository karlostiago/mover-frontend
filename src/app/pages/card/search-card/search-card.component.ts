import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountEntity} from "../../../../entity/AccountEntity";
import {Table} from "primeng/table";
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../service/AlertService";
import {CardService} from "../card.service";
import {BankIconEntity} from "../../../../entity/BankIconEntity";
import {CardEntity} from "../../../../entity/CardEntity";

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.css']
})
export class SearchCardComponent implements OnInit {
    accounts = new Array<AccountEntity>();
    icons = new Array<BankIconEntity>();
    cards = new Array<CardEntity>();

    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private cardService: CardService) {
    }

    async ngOnInit() {
        this.cardService.findAll().then(response => {
            this.cards = response;
        });
    }

    confirmationDelete(card: CardEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir o cartão ${card['name']}?`,
            accept: () => {
                this.delete(card.id);
            }
        })
    }

    delete(id: number) {
        this.cardService.delete(id).then(() => {
            this.cards = this.cards.filter(a => a.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.cardService.findBy(this.searchFilter).then(response => {
            this.cards = response;
            this.table?.reset();
        })
    }
}
