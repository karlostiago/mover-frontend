import {Component, Input, OnInit} from '@angular/core';
import {NumberHelpers} from "../../../../../shared/NumberHelpers";
import {InvoicePaymentDetailEntity} from "../../../../../entity/InvoicePaymentDetailEntity";
import {ConfirmationService} from "primeng/api";

@Component({
    selector: 'app-invoice-payment-detail',
    templateUrl: './invoice-payment-detail.component.html',
    styleUrls: ['./invoice-payment-detail.component.css']
})
export class InvoicePaymentDetailComponent implements OnInit {

    @Input() invoicePaymentDetails = new Array<InvoicePaymentDetailEntity>();

    constructor(private confirmationService: ConfirmationService) { }

    async ngOnInit() {

    }

    confirmationDelete(invoicePaymentDetail: InvoicePaymentDetailEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir o pagamento da fatura ?`,
            accept: () => {
                this.delete(invoicePaymentDetail);
            }
        })
    }

    private delete(invoicePaymentDetail: InvoicePaymentDetailEntity) {
        this.invoicePaymentDetails = this.invoicePaymentDetails.filter( i => i.id !== invoicePaymentDetail.id)
    }

    get totalAmountPaid() {
        return (this.invoicePaymentDetails ?? [])
            .map(i => i.value)
            .reduce((sum, value) => sum + value, 0);
    }

    protected readonly NumberHelpers = NumberHelpers;
}
