import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../service/AlertService";
import {TransactionService} from "../transaction.service";
import {Table} from "primeng/table";
import {ContractEntity} from "../../../../entity/ContractEntity";
import {TransactionEntity} from "../../../../entity/TransactionEntity";
import {BalanceEntity} from "../../../../entity/BalanceEntity";

@Component({
  selector: 'app-search-transaction',
  templateUrl: './search-transaction.component.html',
  styleUrls: ['./search-transaction.component.css']
})
export class SearchTransactionComponent implements OnInit {

    transactions = new Array<TransactionEntity>();
    balance = new BalanceEntity();

    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private transactionService: TransactionService) {
    }

    ngOnInit(): void {
        this.findAll();
        this.updateBalance();
    }

    confirmationDelete(contract: ContractEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir essa Lançamento?`,
            accept: () => {
                this.delete(contract.id);
            }
        });
    }

    delete(id: number) {
        this.transactionService.delete(id).then(() => {
            this.transactions = this.transactions.filter(t => t.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
            this.updateBalance();
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
}
