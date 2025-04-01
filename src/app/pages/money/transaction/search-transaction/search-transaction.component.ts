import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
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
import {AbstractSearch} from "../../../../../abstract/AbstractSearch";

@Component({
  selector: 'app-search-transaction',
  templateUrl: './search-transaction.component.html',
  styleUrls: ['./search-transaction.component.css']
})
export class SearchTransactionComponent extends AbstractSearch implements OnInit {

    accounts = new Array<AccountEntity>();
    selectedAccounts = new Array<AccountEntity>();
    transactions = new Array<TransactionEntity>();
    balance = new BalanceEntity();

    searchFilter: string = "";
    periodoFilter: Date;

    remainingPages: number = -1;

    allowPayment: boolean = false;
    allowRefund: boolean = false;
    allowSchedule: boolean = false;
    allowUndoScheduling: boolean = false;
    allowFilterTransactions: boolean = false;

    expand: boolean = false;
    viewOnlyInvoice: boolean = false;

    private page = 1;

    @ViewChild(DialogDeleteTransactionComponent) dialogDeleteTransaction: DialogDeleteTransactionComponent;
    @ViewChild(DialogConfirmationPaymentComponent) dialogConfirmationPaymentComponent: DialogConfirmationPaymentComponent;

    constructor(private alertService: AlertService,
                private accountServce: AccountService,
                private confirmationService: ConfirmationService,
                private balanceService: BalanceService,
                protected authService: AuthService,
                private transactionService: TransactionService,
                private paginationService: PaginationService,
                private cdr: ChangeDetectorRef) {
        super();
    }

    async ngOnInit() {
        await this.loadingAccounts();
        const fromUpdate = !!localStorage.getItem("TRANSACTION_UPDATE");

        this.expand = localStorage.getItem('TRANSACTION_EXPAND') === 'true';
        this.viewOnlyInvoice = localStorage.getItem('TRANSACTION_VIEW_INVOICE') === 'true';

        this.allowPayment = this.authService.hasPermission('PAYMENT_TRANSACTIONS');
        this.allowSchedule = this.authService.hasPermission('SCHEDULE_TRANSACTIONS');
        this.allowUndoScheduling = this.authService.hasPermission('UNDO_SCHEDULING_TRANSACTIONS');
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
            this.closeSidebarDetails();
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

    schedule(transaction: TransactionEntity) {
        if (this.allowSchedule) {
            this.transactionService.schedule(transaction.id).then(() => {
                this.alertService.success("Lançamento agendado com sucesso.");
                this.updateTransactions();
            });
        }
    }

    undoScheduling(transaction: TransactionEntity) {
        if (this.allowSchedule) {
            this.transactionService.undoScheduling(transaction.id).then(() => {
                this.alertService.success("Agendamento de lançamento desfeito com sucesso.");
                this.updateTransactions();
            });
        }
    }

    search() {
        this.page = 1;
        this.paginationService.clear();
        this.executeSearch(this.createFilters());
    }

    showMore() {
        this.page = this.page + 1;
        this.transactionService.findBy(this.createFilters()).then(response => {
            const existingIds = new Set(this.transactions.map(tr => tr.id));

            response.forEach(t => {
                if (!existingIds.has(t.id)) {
                    if (this.expand) {
                        this.rowExpanded(t);
                    }
                    this.transactions.push(t);
                    existingIds.add(t.id);
                }
            });

            this.transactions = [...this.transactions];

            this.remainingPages = response.length > 0 ? response[0].remainingPages : -1;
            this.paginationService.storedData = this.transactions;
            this.paginationService.currentPage = this.page;
            this.paginationService.remainingPages = this.remainingPages;
        });
    }

    updateTransactions() {
        this.search();
        this.updateBalance(this.createFilters());
    }

    /*
    updateExpand() {
        localStorage.setItem('TRANSACTION_EXPAND', String(this.expand));
    }

    updateViewOnlyInvoice() {
        localStorage.setItem('TRANSACTION_VIEW_INVOICE', String(this.viewOnlyInvoice));
    }
     */

    rowExpanded(transaction: any) {
        if (!transaction.hasInvoice) return;

        const invoice = transaction['invoice'];
        const index = this.transactions.indexOf(transaction);

        if (index !== -1) {
            transaction['expanded'] = true;
            this.transactions.splice(index + 1, 0, ...invoice['transactions']);
            this.transactions = [...this.transactions];
        }
    }

    rowReduce(transaction: any) {
        transaction['expanded'] = false;
        const invoice = transaction['invoice'];
        this.transactions = this.transactions.filter(t => !invoice['transactions'].includes(t));
    }

    createFieldsSidebarDetails() {
        const card = this.selectedValue.cardId > 0 ? `/ ${this.selectedValue.card}` : '';
        this.fields = [
            { label: 'Tipo de lançamento', value: this.selectedValue.categoryType, col: 3, visible: true },
            { label: 'Categoria', value: this.selectedValue.subcategory, col: 2, visible: true },
            { label: 'Descrição', value: this.selectedValue.description, col: 7, visible: true },
            { label: 'Veículo', value: this.selectedValue.vehicle, col: 3, visible: true },
            { label: 'Contrato', value: this.selectedValue.contract, col: 2, visible: true },
            { label: 'Conta / Cartão', value: `${this.selectedValue.account} ${card}`, col: 3, visible: true },
            { label: 'Valor', value: NumberHelpers.currencyBRL(this.selectedValue.value, true), col: 2, visible: true },
            { label: 'Agendado', value: this.selectedValue.scheduled ? 'SIM' : 'NÃO', col: 2, visible: true },
            { label: 'Data vencimento', value: this.selectedValue.dueDate, col: 3, visible: true },
            { label: 'Data pagamento', value: this.selectedValue.paymentDate, col: 2, visible: this.selectedValue.paid },
            { label: 'Efetivado / Pago', value: this.selectedValue.paid ? 'SIM' : 'NÃO', col: 2, visible: true }
        ]
    }

    private updateBalance(filters: string) {
        this.balanceService.calculateBalances(filters).then(response => {
            this.balance = response;
        });
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

            filters[3] = localFilters.split(';')[3];

            if (this.paginationService.storedData.length > 0) {
                this.transactions = this.paginationService.storedData;
                this.remainingPages = this.paginationService.remainingPages;
                this.page = this.paginationService.currentPage;

                this.updateBalance(filters.join(';'));
            } else {
                this.executeSearch(filters.join(';'));
            }
        }
    }

    private executeSearch(filters: string) {
        this.transactionService.findBy(filters).then(response => {
            this.transactions.length = 0;
            this.transactions = this.findAll(response);

            for (const transaction of this.transactions) {
                if (this.expand) {
                    this.rowExpanded(transaction);
                }
            }

            this.updateBalance(filters);
            this.remainingPages = response.length > 0 ? response[0].remainingPages : -1;
            this.cdr.detectChanges();
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
