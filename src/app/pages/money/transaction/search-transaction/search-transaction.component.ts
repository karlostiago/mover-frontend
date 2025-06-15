import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {Router} from "@angular/router";
import {InvoiceService} from "../../invoice/invoice.service";
import {LoaderService} from "../../../../core/loader/loader.service";
import {Subscription} from "rxjs";
import {BalanceWebsocketService} from "../balance-websocket.service";

@Component({
  selector: 'app-search-transaction',
  templateUrl: './search-transaction.component.html',
  styleUrls: ['./search-transaction.component.css']
})
export class SearchTransactionComponent extends AbstractSearch implements OnInit, OnDestroy {

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
    private subscription: Subscription;

    @ViewChild(DialogDeleteTransactionComponent) dialogDeleteTransaction: DialogDeleteTransactionComponent;
    @ViewChild(DialogConfirmationPaymentComponent) dialogConfirmationPaymentComponent: DialogConfirmationPaymentComponent;

    constructor(private alertService: AlertService,
                private accountServce: AccountService,
                private confirmationService: ConfirmationService,
                private balanceService: BalanceService,
                protected authService: AuthService,
                private transactionService: TransactionService,
                private paginationService: PaginationService,
                private invoiceService: InvoiceService,
                private router: Router,
                private loaderService: LoaderService,
                private balanceWebSocketService: BalanceWebsocketService,
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

        this.subscription = this.balanceWebSocketService.balanceUpdated$.subscribe(() => {
            this.updateBalance(this.createFilters());
        });

        if (fromUpdate) {
            this.searchAfterUpdate();
        } else {
            this.periodoFilter = DateHelpers.toUTC(new Date());
            this.search();
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    confirmationDelete(transaction: TransactionEntity) {
        if (transaction.invoice || transaction.installment === 0 || transaction.lastInstallment) {
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
        if (transaction.invoice) {
            this.invoiceService.delete(transaction.id).then(() => {
                this.closeSidebarDetails();
                this.search();
                this.alertService.success("Fatura excluida com sucesso.");
            });
        } else {
            this.transactionService.delete(transaction.id).then(() => {
                this.closeSidebarDetails();
                this.search();
                this.alertService.success("Lançamento excluido com sucesso.");
            });
        }
    }

    confirmationPayment(transaction: TransactionEntity) {
        if (this.allowPayment) {
            if (transaction.invoice) {
                this.redirectToInvoice(transaction);
            } else {
                this.dialogConfirmationPaymentComponent.showDialog(transaction);
            }
        }
    }

    refund(transaction: TransactionEntity) {
        if (this.allowRefund) {
            if (transaction.invoice) {
                this.redirectToInvoice(transaction);
            } else {
                this.transactionService.refund(transaction.id).then(() => {
                    this.alertService.success("Lançamento estornado com sucesso.");
                    this.search();
                });
            }
        }
    }

    schedule(transaction: TransactionEntity) {
        if (transaction.invoice && this.allowSchedule) {
            this.redirectToInvoice(transaction);
        } else if (this.allowSchedule) {
            this.transactionService.schedule(transaction.id).then(() => {
                this.alertService.success("Lançamento agendado com sucesso.");
                this.search();
            });
        }
    }

    undoScheduling(transaction: TransactionEntity) {
        if (transaction.invoice && this.allowSchedule) {
            this.redirectToInvoice(transaction);
        } else if (this.allowSchedule) {
            this.transactionService.undoScheduling(transaction.id).then(() => {
                this.alertService.success("Agendamento de lançamento desfeito com sucesso.");
                this.search();
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

    createFieldsSidebarDetails() {
        const card = this.selectedValue.cardId > 0 ? `/ ${this.selectedValue.card}` : '';
        if (this.selectedValue.invoice) {
            this.fieldsSidebarDetailsInvoice(card);
        } else {
            this.fieldsSidebarDetailsTransaction(card);
        }
    }

    private redirectToInvoice(transaction: TransactionEntity) {
        void this.router.navigate([
            '/invoices', transaction.id, 'credit-card', transaction.cardId
        ]);
    }

    private fieldsSidebarDetailsTransaction(card: string) {
        this.fields = [
            ...this.fieldsDefault(),
            { label: 'Veículo', value: this.selectedValue.vehicle, col: 3, visible: !this.selectedValue.invoice },
            { label: 'Contrato', value: this.selectedValue.contract, col: 2, visible: !this.selectedValue.invoice },
            { label: 'Conta / Cartão', value: `${this.selectedValue.account} ${card}`, col: 3, visible: true },
            { label: 'Valor', value: NumberHelpers.currencyBRL(this.selectedValue.value, true), col: 2, visible: true },
            { label: 'Agendado', value: this.selectedValue.scheduled ? 'SIM' : 'NÃO', col: 2, visible: true },
            { label: 'Data vencimento', value: this.selectedValue.dueDate, col: 3, visible: true },
            { label: 'Data pagamento', value: this.selectedValue.paymentDate, col: 2, visible: this.selectedValue.paid },
            { label: 'Efetivado / Pago', value: this.selectedValue.paid ? 'SIM' : 'NÃO', col: 2, visible: true }
        ]
    }

    private fieldsSidebarDetailsInvoice(card: string) {
        this.fields = [
            ...this.fieldsDefault(),
            { label: 'Conta / Cartão', value: `${this.selectedValue.account} ${card}`, col: 3, visible: true },
            { label: 'Data vencimento', value: this.selectedValue.dueDate, col: 2, visible: true },
            { label: 'Valor', value: NumberHelpers.currencyBRL(this.selectedValue.value, true), col: 2, visible: true },
            { label: 'Agendado', value: this.selectedValue.scheduled ? 'SIM' : 'NÃO', col: 2, visible: true },
            { label: 'Data pagamento', value: this.selectedValue.paymentDate, col: 2, visible: this.selectedValue.paid },
            { label: 'Efetivado / Pago', value: this.selectedValue.paid ? 'SIM' : 'NÃO', col: 2, visible: true }
        ]
    }

    private fieldsDefault() {
        return [
            { label: 'Tipo de lançamento', value: this.selectedValue.categoryType, col: 3, visible: true },
            { label: 'Categoria', value: this.selectedValue.subcategory, col: 2, visible: true },
            { label: 'Descrição', value: this.selectedValue.description, col: 7, visible: true },
        ]
    }

    private updateBalance(filters: string) {
        this.loaderService.automatic = false;
        this.balanceService.calculateBalances(filters).then(response => {
            this.balance = response;
        });
        this.loaderService.automatic = true;
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
            } else {
                this.executeSearch(filters.join(';'));
            }
        }
    }

    private executeSearch(filters: string) {
        this.transactionService.findBy(filters).then(response => {
            this.transactions.length = 0;
            this.transactions = this.findAll(response);
            this.remainingPages = response.length > 0 ? response[0].remainingPages : -1;
            this.updateBalance(this.createFilters());
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
