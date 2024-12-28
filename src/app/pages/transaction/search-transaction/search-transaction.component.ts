import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService} from "../../../../service/AlertService";
import {TransactionService} from "../transaction.service";
import {Table} from "primeng/table";
import {TransactionEntity} from "../../../../entity/TransactionEntity";
import {BalanceEntity} from "../../../../entity/BalanceEntity";
import {NumberHelpers} from "../../../../shared/NumberHelpers";

@Component({
  selector: 'app-search-transaction',
  templateUrl: './search-transaction.component.html',
  styleUrls: ['./search-transaction.component.css']
})
export class SearchTransactionComponent implements OnInit {

    transactions = new Array<TransactionEntity>();
    balance = new BalanceEntity();

    searchFilter: string = "";

    visible = false;

    @ViewChild("table") table: Table | undefined;

    selectedTransaction: TransactionEntity;

    constructor(private alertService: AlertService,
                private transactionService: TransactionService) {
    }

    ngOnInit(): void {
        this.findAll();
        this.updateBalance();
    }

    confirmationDelete(transaction: TransactionEntity) {
        this.selectedTransaction = transaction;
        this.visible = true;
    }

    deleteOnlyThis() {
        this.transactionService.remove(this.selectedTransaction.id, true).then(() => {
            this.updateTransactions();
            this.alertService.success("Lançamento excluido com sucesso.");
        });
    }

    deleteThisAndNext() {
        this.transactionService.remove(this.selectedTransaction.id, false).then(() => {
            this.updateTransactions();
            this.alertService.success("Lançamentos excluídos com sucesso.");
        });
    }

    pay(transaction: TransactionEntity) {
        this.transactionService.pay(transaction.id).then(() => {
            this.alertService.success("Lançamento efetivado com sucesso.");
            this.findAll();
            this.updateBalance();
            this.table?.reset();
        });
    }

    refund(transaction: TransactionEntity) {
        this.transactionService.refund(transaction.id).then(() => {
            this.alertService.success("Lançamento estornado com sucesso.");
            this.findAll();
            this.updateBalance();
            this.table?.reset();
        });
    }

    filterBy() {
        this.transactionService.findBy(this.searchFilter).then(response => {
            this.transactions = response;
            this.table?.reset();
        });
    }

    get description() {
        return this.selectedTransaction ? this.selectedTransaction.description : '';
    }

    private updateTransactions() {
        this.findAll();
        this.updateBalance();
        this.table?.reset();
        this.visible = false;
    }

    private updateBalance() {
        this.transactionService.balance().then(response => {
            this.balance = response;
        })
    }

    private findAll() {
        this.transactionService.findAll().then(response => {
            this.transactions = response;
        });
    }

    protected readonly NumberHelpers = NumberHelpers;
}
