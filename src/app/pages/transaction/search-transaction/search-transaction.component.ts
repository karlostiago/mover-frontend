import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService} from "../../../../service/AlertService";
import {TransactionService} from "../transaction.service";
import {TransactionEntity} from "../../../../entity/TransactionEntity";
import {BalanceEntity} from "../../../../entity/BalanceEntity";
import {NumberHelpers} from "../../../../shared/NumberHelpers";
import {DateHelpers} from "../../../../shared/DateHelpers";
import {AccountService} from "../../account/account.service";
import {AccountEntity} from "../../../../entity/AccountEntity";
import {ConfirmationService} from "primeng/api";
import {DialogDeleteTransactionComponent} from "../dialog-delete-transaction/dialog-delete-transaction.component";
import {DialogConfirmationPaymentComponent} from "../dialog-confirmation-payment/dialog-confirmation-payment.component";

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

    selectedTransaction: TransactionEntity;

    remainingPages: number = -1;

    private page = 1;

    @ViewChild(DialogDeleteTransactionComponent) dialogDeleteTransaction: DialogDeleteTransactionComponent;
    @ViewChild(DialogConfirmationPaymentComponent) dialogConfirmationPaymentComponent: DialogConfirmationPaymentComponent;

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
                message: `Tem certeza que deseja excluir o Lançamento ${this.selectedTransaction.description}`,
                accept: () => {
                    this.delete();
                }
            })
        } else {
            this.dialogDeleteTransaction.showDialog(transaction);
        }
    }

    delete() {
        this.transactionService.remove(this.selectedTransaction.id, true).then(() => {
            this.updateTransactions();
            this.alertService.success("Lançamento excluido com sucesso.");
        });
    }

    confirmationPayment(transaction: TransactionEntity) {
        this.dialogConfirmationPaymentComponent.showDialog(transaction);
    }

    refund(transaction: TransactionEntity) {
        this.transactionService.refund(transaction.id).then(() => {
            this.alertService.success("Lançamento estornado com sucesso.");
            this.updateTransactions();
        });
    }

    filterBy() {
        this.page = 1;
        this.transactionService.findBy(this.createFilters()).then(response => {
            this.transactions = response;
            this.updateBalance();
            if (response.length > 0) {
                this.remainingPages = response[0].remainingPages;
            } else {
                this.remainingPages = -1;
            }
        });
    }

    calculatedSubTotal(transaction: TransactionEntity): { subtotal: number, isNegative: boolean } {
        const subtotal = this.transactions.reduce((subtotal, tr) => {
            const isSameDate = tr.date === transaction.date;
            if (isSameDate) {
                subtotal += tr.value;
            }
            return subtotal;
        }, 0);
        const isNegative = subtotal < 0;
        return { subtotal, isNegative };
    }

    showMore() {
        this.page = this.page + 1;
        this.transactionService.findBy(this.createFilters()).then(response => {
            this.transactions = [...this.transactions, ...response];
            if (response.length > 0) {
                this.remainingPages = response[0].remainingPages;
            } else {
                this.remainingPages = -1;
            }
        });
    }

    updateTransactions() {
        this.filterBy();
        this.updateBalance();
    }

    private updateBalance() {
        this.transactionService.balance(this.createFilters()).then(response => {
            this.balance = response;
        })
    }

    private createFilters() {
        const filters = new Array(4);

        if (this.periodoFilter) {
            filters[0] = DateHelpers.getMonthAndYear(this.periodoFilter);
        }
        if (this.selectedAccounts) {
            filters[1] = this.selectedAccounts.map(account => account.id).join(',');
        }
        if(this.searchFilter) {
            filters[2] = this.searchFilter;
        }

        filters[3] = this.page;

        return filters.join(';');
    }

    private loadingAccounts() {
        this.accountServce.findAll().then(response => {
            this.accounts = response;
        });
    }

    protected readonly NumberHelpers = NumberHelpers;
}
