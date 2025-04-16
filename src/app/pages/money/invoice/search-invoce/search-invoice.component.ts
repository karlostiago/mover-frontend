import {Component, OnInit} from '@angular/core';
import {AbstractSearch} from "../../../../../abstract/AbstractSearch";
import {TransactionEntity} from "../../../../../entity/TransactionEntity";
import {AuthService} from "../../../../core/login/auth.service";
import {ActivatedRoute} from "@angular/router";
import {NumberHelpers} from "../../../../../shared/NumberHelpers";
import {InvoiceService} from "../invoice.service";
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../../shared/service/AlertService";
import {GlobalDialogService, TypeDialog} from "../../../../../shared/service/GlobalDialogService";
import {InvoicePaymentDetailEntity} from "../../../../../entity/InvoicePaymentDetailEntity";

@Component({
  selector: 'app-invoice-brand',
  templateUrl: './search-invoice.component.html',
  styleUrls: ['./search-invoice.component.css']
})
export class SearchInvoiceComponent extends AbstractSearch implements OnInit {

    private id: number;

    invoice = new TransactionEntity();
    transactions = new Array<TransactionEntity>();
    invoicePaymentDetails = new Array<InvoicePaymentDetailEntity>();

    constructor(protected authService: AuthService,
                private invoiceService: InvoiceService,
                private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private globalService: GlobalDialogService,
                protected activatedRoute: ActivatedRoute) {
        super();
        if (this.activatedRoute.snapshot.params['id']) {
            this.id = this.activatedRoute.snapshot.params['id'];
        }
    }

    async ngOnInit() {
        this.loading();
    }

    confirmationDelete(transaction: TransactionEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir o Lançamento ${transaction.description}`,
            accept: () => {
                this.delete(transaction);
            }
        });
    }

    delete(transaction: TransactionEntity) {
        this.invoiceService.delete(transaction.id).then(() => {
            this.closeSidebarDetails();
            this.loading();
            this.alertService.success("Lançamento excluido com sucesso.");
        });
    }

    schedule(transaction: TransactionEntity) {
        this.invoiceService.schedule(transaction.id).then(() => {
            this.alertService.success("Fatura agendada com sucesso.");
            this.loading();
        });
    }

    undoScheduling(transaction: TransactionEntity) {
        this.invoiceService.undoScheduling(transaction.id).then(() => {
            this.alertService.success("Agendamento de fatura desfeito com sucesso.");
            this.loading();
        });
    }

    pay() {
        const result$ = this.globalService.openDialog<boolean>(TypeDialog.CONFIRMATION_INVOICE_PAYMENT, this.invoice);
        result$?.subscribe((response) => {
            if (response === true) {
                this.invoice.paid = true;
                this.loadingInvoicePaymentDetails();
            }
        })
    }

    confirmationRefund() {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja estornar a ${this.invoice.description} ?`,
            accept: () => {
                this.refund(this.invoice.id);
            }
        })
    }

    isInvoicePaid() {
        return NumberHelpers.invertSignalWhenNegative(this.invoice['amountPaid']) >=
            NumberHelpers.invertSignalWhenNegative(this.invoice['value']);
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

    private refund(id: number) {
        this.invoiceService.refund(id).then(response => {
            this.invoicePaymentDetails = [];
        });
    }

    private loading() {
        this.invoiceService.searchInvoice(this.id).then(response => {
            this.transactions = response.filter(t => !t.invoice);
            this.invoice = response.find(t => t.invoice)!;
            this.loadingInvoicePaymentDetails();

            localStorage.setItem("TRANSACTION_UPDATE", String(true));
        });
    }

    private loadingInvoicePaymentDetails() {
        this.invoiceService.invoicePaymentDetail(this.invoice.id).then(response => {
            this.invoicePaymentDetails = response;
        });
    }

    protected readonly NumberHelpers = NumberHelpers;
}
