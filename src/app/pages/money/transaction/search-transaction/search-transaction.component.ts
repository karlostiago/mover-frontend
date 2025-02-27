import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../shared/service/AlertService";
import {TransactionService} from "../transaction.service";
import {TransactionEntity} from "../../../../../entity/TransactionEntity";
import {BalanceEntity} from "../../../../../entity/BalanceEntity";
import {NumberHelpers} from "../../../../../shared/NumberHelpers";
import {DateHelpers} from "../../../../../shared/DateHelpers";
import {AccountService} from "../../../configuration/account/account.service";
import {AccountEntity} from "../../../../../entity/AccountEntity";
import {ConfirmationService} from "primeng/api";
import {DialogDeleteTransactionComponent} from "../dialog-delete-transaction/dialog-delete-transaction.component";
import {DialogConfirmationPaymentComponent} from "../dialog-confirmation-payment/dialog-confirmation-payment.component";
import {BalanceService} from "../balance.service";
import {AuthService} from "../../../../core/login/auth.service";
import {PaginationService} from "../../../../../shared/service/PaginationService";

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

    remainingPages: number = -1;

    private page = 1;

    @ViewChild(DialogDeleteTransactionComponent) dialogDeleteTransaction: DialogDeleteTransactionComponent;
    @ViewChild(DialogConfirmationPaymentComponent) dialogConfirmationPaymentComponent: DialogConfirmationPaymentComponent;

    allowPayment: boolean = false;
    allowRefund: boolean = false;
    allowFilterTransactions: boolean = false;

    constructor(private alertService: AlertService,
                private accountServce: AccountService,
                private confirmationService: ConfirmationService,
                private balanceService: BalanceService,
                protected authService: AuthService,
                private transactionService: TransactionService,
                private paginationService: PaginationService) {
    }

    async ngOnInit() {
        await this.loadingAccounts();
        const fromUpdate = !!localStorage.getItem("TRANSACTION_UPDATE");

        this.allowPayment = this.authService.hasPermission('PAYMENT_TRANSACTIONS');
        this.allowRefund = this.authService.hasPermission('REFUND_TRANSACTIONS');
        this.allowFilterTransactions = this.authService.hasPermission('FILTER_TRANSACTIONS')

        if (fromUpdate) {
            this.searchAfterUpdate();
        } else {
            this.periodoFilter = DateHelpers.toUTC(new Date());
            this.search();
        }
    }

    confirmationDelete(transaction: TransactionEntity) {
        if (transaction.installment === 0 || transaction.lastInstallment) {
            this.confirmationService.confirm({
                message: `Tem certeza que deseja excluir o Lançamento ${transaction.description}`,
                accept: () => {
                    this.delete(transaction);
                }
            })
        } else {
            this.dialogDeleteTransaction.showDialog(transaction);
        }
    }

    delete(transaction: TransactionEntity) {
        this.transactionService.delete(transaction.id).then(() => {
            this.updateTransactions();
            this.alertService.success("Lançamento excluido com sucesso.");
        });
    }

    confirmationPayment(transaction: TransactionEntity) {
        if (this.allowPayment) {
            this.dialogConfirmationPaymentComponent.showDialog(transaction);
        }
    }

    refund(transaction: TransactionEntity) {
        if (this.allowRefund) {
            this.transactionService.refund(transaction.id).then(() => {
                this.alertService.success("Lançamento estornado com sucesso.");
                this.updateTransactions();
            });
        }
    }

    search() {
        this.page = 1;
        this.paginationService.clear();
        this.executeSearch(this.createFilters());
    }

    // calculatedSubTotal(transaction: TransactionEntity): { subtotal: number, isNegative: boolean } {
    //     const subtotal = this.transactions.reduce((subtotal, tr) => {
    //         const isSameDate = tr.date === transaction.date;
    //         if (isSameDate) {
    //             subtotal += tr.value;
    //         }
    //         return subtotal;
    //     }, 0);
    //     const isNegative = subtotal < 0;
    //     return { subtotal, isNegative };
    // }

    showMore() {
        this.page = this.page + 1;
        this.transactionService.findBy(this.createFilters()).then(response => {
            this.transactions = [...this.transactions, ...response];
            if (response.length > 0) {
                this.remainingPages = response[0].remainingPages;
            } else {
                this.remainingPages = -1;
            }
            this.paginationService.storedData = this.transactions;
            this.paginationService.currentPage = this.page;
            this.paginationService.remainingPages = this.remainingPages;
        });
    }

    updateTransactions() {
        this.search();
        this.updateBalance(this.createFilters());
    }

    private updateBalance(filters: string) {
        this.balanceService.calculateBalances(filters).then(response => {
            this.balance = response;
        })
    }

    private searchAfterUpdate() {
        const filters = new Array(4);
        localStorage.removeItem("TRANSACTION_UPDATE");
        const localFilters = localStorage.getItem("TRANSACTION_FILTER");
        if (localFilters) {

            this.periodoFilter = DateHelpers.parseMonthAndYearToDate(localFilters.split(';')[0]);
            const accounts = localFilters.split(';')[1];
            const text = localFilters.split(';')[2];

            filters[0] = DateHelpers.getMonthAndYear(this.periodoFilter);

            if (accounts) {
                filters[1] = accounts.split(',');
                this.selectedAccounts = this.accounts.filter(acc => accounts.split(',').includes(String(acc.id)));
            }

            if (text) {
                filters[2] = text;
                this.searchFilter = text;
            }

            if (this.paginationService.storedData.length > 0) {
                this.transactions = this.paginationService.storedData;
                this.remainingPages = this.paginationService.remainingPages;
                this.page = this.paginationService.currentPage;
            } else {
                filters[3] = localFilters.split(';')[3];
                this.executeSearch(filters.join(';'));
            }
        }
    }

    private executeSearch(filters: string) {
        this.transactionService.findBy(filters).then(response => {
            this.transactions = response;
            this.updateBalance(filters);
            if (response.length > 0) {
                this.remainingPages = response[0].remainingPages;
            } else {
                this.remainingPages = -1;
            }
        });
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

        localStorage.setItem("TRANSACTION_FILTER", filters.join(";"));

        return filters.join(';');
    }

    private async loadingAccounts() {
        await this.accountServce.findAll().then(response => {
            this.accounts = response.filter(c => c.active);
        });
    }

    protected readonly NumberHelpers = NumberHelpers;
}
