import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from "../../../../../shared/service/AlertService";
import {TransactionService} from "../transaction.service";
import {TransactionEntity} from "../../../../../entity/TransactionEntity";
import {BalanceEntity} from "../../../../../entity/BalanceEntity";
import {NumberHelpers} from "../../../../../shared/helper/NumberHelpers";
import {DateHelpers} from "../../../../../shared/helper/DateHelpers";
import {AccountService} from "../../../configuration/account/account.service";
import {AccountEntity} from "../../../../../entity/AccountEntity";
import {ConfirmationService} from "primeng/api";
import {BalanceService} from "../balance.service";
import {AuthService} from "../../../../core/login/auth.service";
import {PaginationHelper} from "../../../../../shared/helper/PaginationHelper";
import {AbstractSearch} from "../../../../../abstract/AbstractSearch";
import {ActivatedRoute, Router} from "@angular/router";
import {InvoiceService} from "../../invoice/invoice.service";
import {LoaderService} from "../../../../core/loader/loader.service";
import {Subscription} from "rxjs";
import {BalanceWebsocketService} from "../balance-websocket.service";
import {Page} from "../../../../../entity/Page";
import {FilterStorageManager} from "../../../../../shared/helper/FilterStorageManager";
import {GlobalDialogService, TypeDialog} from "../../../../../shared/service/GlobalDialogService";

interface Filters {
    period: string;
    accounts: number[];
    searchText: string;
    comeToDashboard?: boolean;
}

@Component({
  selector: 'app-search-transaction',
  templateUrl: './search-transaction.component.html',
  styleUrls: ['./search-transaction.component.css']
})
export class SearchTransactionComponent extends AbstractSearch implements OnInit, OnDestroy {
    pagination = new PaginationHelper<TransactionEntity, Page<TransactionEntity>>();
    accounts = new Array<AccountEntity>();
    selectedAccounts = new Array<AccountEntity>();
    transactions = new Array<TransactionEntity>();
    balance = new BalanceEntity();

    searchText: string = "";
    periodFilter: Date;

    allowPayment: boolean = false;
    allowRefund: boolean = false;
    allowSchedule: boolean = false;
    allowUndoScheduling: boolean = false;
    allowFilterTransactions: boolean = false;
    loadingData: boolean = true;
    isMobile: boolean = false;

    private subscription: Subscription;
    private calendarFocused: boolean = false;
    private comeToDashboard: boolean = false;
    private filterManager = new FilterStorageManager<Filters>('TRANSACTION_FILTER');

    constructor(private alertService: AlertService,
                private accountServce: AccountService,
                private confirmationService: ConfirmationService,
                private balanceService: BalanceService,
                protected authService: AuthService,
                private transactionService: TransactionService,
                private invoiceService: InvoiceService,
                private router: Router,
                private loaderService: LoaderService,
                private balanceWebSocketService: BalanceWebsocketService,
                private route: ActivatedRoute,
                private globalService: GlobalDialogService) {
        super();
        this.checkScreenSize();
    }

    async ngOnInit() {
        this.loadingData = true;
        await this.loadingAccounts();
        this.pagination.initialization(15);
        this.loadingPermission();

        this.route.queryParams.subscribe(params => {
           if (Object.keys(params).length > 0) {
               this.applyFiltersFromDashboard(params);
           } else {
               const filter = this.getFilters(this.periodFilter ?? new Date(), false);
               this.updateFilters(filter);
               this.filterManager.save(filter);
           }
        });

        this.subscription = this.balanceWebSocketService.balanceUpdated$.subscribe(() => {
            this.updateBalance(this.createFilters());
        });

        this.search();
        this.loadingData = false;
        this.resizeEventListener();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.resizeEventListener();
    }

    confirmationDelete(transaction: TransactionEntity) {
        if (transaction.invoice || transaction.installment === 0 || transaction.lastInstallment) {
            this.confirmationService.confirm({
                message: `Tem certeza que deseja excluir o Lançamento ${transaction.description}`,
                accept: () => {
                    this.delete(transaction);
                }
            });
        } else {
            this.globalService.openDialog<any>(TypeDialog.DELETE_TRANSACTION, transaction, {})?.subscribe((response) => {
                this.deleteTransaction(response);
            });
        }
    }

    confirmationPayment(transaction: TransactionEntity) {
        if (this.allowPayment) {
            if (transaction.invoice) {
                this.redirectToInvoice(transaction);
            } else {
               this.globalService.openDialog<any>(TypeDialog.CONFIRMATION_PAYMENT_TRANSACTION, transaction, {})?.subscribe({
                   next: (response) => {
                       this.updateTransaction(response.entity);
                   }
               });
            }
        }
    }

    refund(transaction: TransactionEntity) {
        if (this.allowRefund) {
            if (transaction.invoice) {
                this.redirectToInvoice(transaction);
            } else {
                this.transactionService.refund(transaction.id).then(() => {
                    transaction.paid = false;
                    this.updateTransaction(transaction);
                    this.alertService.success("Lançamento estornado com sucesso.");
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
                transaction.scheduled = true;
                this.updateTransaction(transaction);
            });
        }
    }

    undoScheduling(transaction: TransactionEntity) {
        if (transaction.invoice && this.allowSchedule) {
            this.redirectToInvoice(transaction);
        } else if (this.allowSchedule) {
            this.transactionService.undoScheduling(transaction.id).then(() => {
                this.alertService.success("Agendamento de lançamento desfeito com sucesso.");
                transaction.scheduled = false;
                this.updateTransaction(transaction);
            });
        }
    }

    search() {
        this.transactions = [];
        this.pagination.reset();
        this.loading();
    }

    loading() {
        this.pagination.load(
            () => this.transactionService.findBy(this.createFilters(), this.pagination.page, this.pagination.size),
            (response) => {
                const existingIds = new Set(this.transactions.map(tr => tr.id));

                response.content.forEach(t => {
                    if (!existingIds.has(t.id)) {
                        this.transactions.push(t);
                        existingIds.add(t.id);
                    }
                });

                this.transactions = [...this.transactions];
                this.updateBalance(this.createFilters());
                this.updateDailyBalance(this.createFilters());
            }
        );
    }

    updateTransaction(transaction: TransactionEntity) {
        const isTransfer = transaction.categoryType === 'TRANSFERÊNCIA';

        if (isTransfer) {
            this.transactions
                .filter(t => t.signature === transaction.signature)
                .forEach(t => t.paid = transaction.paid);
            return;
        }

        const index = this.transactions.findIndex(t => t.id === transaction.id);
        if (index !== -1) {
            this.transactions[index] = transaction;
        }

        this.updateDailyBalance(this.createFilters());
    }

    deleteTransaction(e: { transaction: TransactionEntity, batch: boolean }) {
        const transaction = e.transaction;
        const batch = e.batch;
        if (batch) {
            this.transactions = this.transactions
                .filter(t => !(t.signature === transaction.signature && t.installment >= transaction.installment));
        } else {
            this.transactions = this.transactions.filter(t => t.id !== transaction.id);
        }
        this.closeSidebarDetails();
    }

    createFieldsSidebarDetails() {
        const card = this.selectedValue.cardId > 0 ? `/ ${this.selectedValue.card}` : '';
        if (this.selectedValue.invoice) {
            this.fieldsSidebarDetailsInvoice(card);
        } else {
            this.fieldsSidebarDetailsTransaction(card);
        }
    }

    onCalendarFocus() {
        this.calendarFocused = true;
    }

    onCalendarBlur() {
        this.calendarFocused = !this.calendarFocused;
    }

    private checkScreenSize() {
        this.isMobile = window.innerWidth <= 1300;
    }

    private resizeEventListener() {
        window.addEventListener('resize', () => this.checkScreenSize());
    }

    private delete(transaction: TransactionEntity) {
        if (transaction.invoice) {
            this.invoiceService.delete(transaction.id).then(() => {
                this.closeSidebarDetails();
                this.search();
                this.alertService.success("Fatura excluida com sucesso.");
            });
        } else {
            this.transactionService.delete(transaction.id).then(() => {
                this.deleteTransaction({ transaction: transaction, batch: transaction.categoryType === 'TRANSFERÊNCIA' });
                this.alertService.success("Lançamento excluido com sucesso.");
            });
        }
    }

    private loadingPermission() {
        this.allowPayment = this.authService.hasPermission('PAYMENT_TRANSACTIONS');
        this.allowSchedule = this.authService.hasPermission('SCHEDULE_TRANSACTIONS');
        this.allowUndoScheduling = this.authService.hasPermission('UNDO_SCHEDULING_TRANSACTIONS');
        this.allowRefund = this.authService.hasPermission('REFUND_TRANSACTIONS');
        this.allowFilterTransactions = this.authService.hasPermission('FILTER_TRANSACTIONS')
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
        }).finally(() => {
            this.loaderService.automatic = true;
        });
    }

    private updateDailyBalance(filters: string) {
        this.loaderService.automatic = false;
        this.balanceService.findExpectedBalanceOnDay(filters).then(response => {
           const dailyBalances = response;
           const groupedDate = this.groupTransactionsByPeriod();

           for (const dailyBalance of dailyBalances) {
               const transactions = groupedDate.get(dailyBalance.period);
               if (transactions) {
                   for (const tr of transactions) {
                        tr.dailyBalance = dailyBalance.balance;
                   }
               }
           }
        }).finally(() => {
            this.loaderService.automatic = true;
        });
    }

    private groupTransactionsByPeriod(): Map<Date, TransactionEntity[]> {
        return this.transactions.reduce((map, transaction) => {
            const date = transaction.date;
            if (!map.has(date)) {
                map.set(date, []);
            }
            map.get(date)!.push(transaction);
            return map;
        }, new Map<Date, TransactionEntity[]>());
    }

    private createFilters() {
        let filter: Filters | null;
        let isUpdate = !!localStorage.getItem("TRANSACTION_UPDATE");

        if (isUpdate) {
            filter = this.filterManager.load();
            localStorage.removeItem("TRANSACTION_UPDATE");
            if (filter) {
                this.updateFilters(filter);
            }
        } else {
            filter = this.getFilters(this.periodFilter ?? new Date(), this.comeToDashboard);
            this.updateFilters(filter);
            this.filterManager.save(filter!);
        }

        return `${filter?.period};${filter?.accounts.join(',')};${filter?.searchText};${filter?.comeToDashboard}`;
    }

    private updateFilters(filters: Filters) {
        this.periodFilter = DateHelpers.parseMonthAndYearToDate(filters.period);
        this.selectedAccounts = this.accounts.filter(acc => String(filters?.accounts).split(',').includes(String(acc.id)));
        this.searchText = filters?.searchText;
        this.comeToDashboard = filters?.comeToDashboard ?? false
    }

    private applyFiltersFromDashboard(params: any) {
        const filters = this.getFilters(new Date(), true);

        if (params.q) {
            filters.searchText = params.q;
        }

        this.updateFilters(filters);
        this.filterManager.save(filters);
    }

    private getFilters(period: Date, comeToDashboard: boolean = false): Filters {
        return {
            period: DateHelpers.getMonthAndYear(period),
            accounts: this.selectedAccounts.map(account => account.id),
            searchText: this.searchText,
            comeToDashboard: comeToDashboard
        }
    }

    private async loadingAccounts() {
        const response = await this.accountServce.findAll();
        this.accounts = response.filter(c => c.active);
    }

    protected readonly NumberHelpers = NumberHelpers;
}
