import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NumberHelpers} from "../../../../../shared/helper/NumberHelpers";
import {InvoicePaymentDetailEntity} from "../../../../../entity/InvoicePaymentDetailEntity";
import {ConfirmationService} from "primeng/api";
import {InvoiceService} from "../invoice.service";
import {AlertService} from "../../../../../shared/service/AlertService";

@Component({
    selector: 'app-invoice-payment-detail',
    templateUrl: './invoice-payment-detail.component.html',
    styleUrls: ['./invoice-payment-detail.component.css']
})
export class InvoicePaymentDetailComponent implements OnInit {

    @Input() invoicePaymentDetails = new Array<InvoicePaymentDetailEntity>();
    @Output() amountPaid = new EventEmitter<number>();

    constructor(private confirmationService: ConfirmationService,
                private alert: AlertService,
                private invoiceService: InvoiceService) { }

    async ngOnInit() {

    }

    confirmationDelete(invoicePaymentDetail: InvoicePaymentDetailEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja estornar este pagamento ?`,
            accept: () => {
                this.delete(invoicePaymentDetail);
            }
        })
    }

    private delete(invoicePaymentDetail: InvoicePaymentDetailEntity) {
        this.invoiceService.refund(invoicePaymentDetail.id).then(() => {
            this.alert.success('Pagamento excluído com sucesso.');
            this.invoicePaymentDetails = this.invoicePaymentDetails.filter( i => i.id !== invoicePaymentDetail.id);
            this.amountPaid.emit(this.totalAmountPaid);
        });
    }

    get totalAmountPaid() {
        return (this.invoicePaymentDetails ?? [])
            .map(i => i.value)
            .reduce((sum, value) => sum + value, 0);
    }

    protected readonly NumberHelpers = NumberHelpers;
}
