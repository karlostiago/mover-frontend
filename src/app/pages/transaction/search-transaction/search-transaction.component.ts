import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AlertService} from "../../../../service/AlertService";
import {TransactionService} from "../transaction.service";
import {Table} from "primeng/table";
import {TransactionEntity} from "../../../../entity/TransactionEntity";
import {BalanceEntity} from "../../../../entity/BalanceEntity";
import {NumberHelpers} from "../../../../shared/NumberHelpers";
import {DateHelpers} from "../../../../shared/DateHelpers";
import {AccountService} from "../../account/account.service";
import {AccountEntity} from "../../../../entity/AccountEntity";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-search-transaction',
  templateUrl: './search-transaction.component.html',
  styleUrls: ['./search-transaction.component.css']
})
export class SearchTransactionComponent implements OnInit {

    accounts = new Array<AccountEntity>();
    selectedAccounts = new Array<AccountEntity>();
    transactions = new Array<TransactionEntity>();
    balance = new BalanceEntity();

    searchFilter: string = "";
    periodoFilter: Date;

    visible = false;

    @ViewChild("table") table: Table | undefined;

    selectedTransaction: TransactionEntity;

    constructor(private alertService: AlertService,
                private accountServce: AccountService,
                private confirmationService: ConfirmationService,
                private transactionService: TransactionService) {
    }

    ngOnInit(): void {
        this.periodoFilter = DateHelpers.toUTC(new Date());
        this.loadingAccounts();
        this.updateBalance();
        this.filterBy();
    }

    confirmationDelete(transaction: TransactionEntity) {
        this.selectedTransaction = transaction;
        if (transaction.installment === 0) {
            this.confirmationService.confirm({
                message: `Tem certeza que deseja excluir o Lançamento ${this.description}`,
                accept: () => {
                    this.deleteOnlyThis();
                }
            })
        } else {
            this.visible = true;
        }
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
            this.filterBy();
            this.updateBalance();
            this.table?.reset();
        });
    }

    refund(transaction: TransactionEntity) {
        this.transactionService.refund(transaction.id).then(() => {
            this.alertService.success("Lançamento estornado com sucesso.");
            this.filterBy();
            this.updateBalance();
            this.table?.reset();
        });
    }

    filterBy() {
        this.transactionService.findBy(this.createFilters()).then(response => {
            this.transactions = response;
            this.table?.reset();
        });
    }

    calculatedSubTotal(transaction: TransactionEntity): { subtotal: number, isNegative: boolean } {
        const subtotal = this.transactions.reduce((subtotal, tr) => {
            const isSameDueDate = tr.dueDate === transaction.dueDate;
            const isPaid = tr.paid;

            // Somar ou subtrair o valor dependendo das condições
            const value = tr.value;
            if ((isSameDueDate && !isPaid) || isPaid) {
                subtotal += value;
            }

            return subtotal;
        }, 0);

        // Verificar se o subtotal é negativo
        const isNegative = subtotal < 0;

        return { subtotal, isNegative };
    }

    get description() {
        return this.selectedTransaction ? this.selectedTransaction.description : '';
    }

    private createFilters() {
        const filters = new Array(3);

        if (this.periodoFilter) {
            filters[0] = DateHelpers.getMonthAndYear(this.periodoFilter);
        }
        if (this.selectedAccounts) {
            filters[1] = this.selectedAccounts.map(account => account.id).join(',');
        }
        if(this.searchFilter) {
            filters[2] = this.searchFilter;
        }

        return filters.join(';');
    }

    private updateTransactions() {
        this.filterBy();
        this.updateBalance();
        this.table?.reset();
        this.visible = false;
    }

    private updateBalance() {
        this.transactionService.balance().then(response => {
            this.balance = response;
        })
    }

    private loadingAccounts() {
        this.accountServce.findAll().then(response => {
            this.accounts = response;
        });
    }

    protected readonly NumberHelpers = NumberHelpers;
}
