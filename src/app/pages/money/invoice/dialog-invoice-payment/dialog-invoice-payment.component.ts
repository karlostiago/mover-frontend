import {Component, Input, OnInit} from '@angular/core';
import {AlertService} from "../../../../../shared/service/AlertService";
import {TransactionEntity} from "../../../../../entity/TransactionEntity";
import {InvoiceService} from "../invoice.service";
import {AccountService} from "../../../configuration/account/account.service";
import {Subject} from "rxjs";
import {NumberHelpers} from "../../../../../shared/NumberHelpers";

@Component({
  selector: 'app-dialog-invoice-payment',
  templateUrl: './dialog-invoice-payment.component.html',
  styleUrls: ['./dialog-invoice-payment.component.css']
})
export class DialogInvoicePaymentComponent implements OnInit {

    accounts = new Array<any>();
    result$: Subject<any>;
    transaction = new TransactionEntity();

    @Input() visible = false;

    constructor(private alertService: AlertService,
                private accountService: AccountService,
                private invoiceService: InvoiceService) {
    }

    async ngOnInit() {

    }

    showDialog(transaction: TransactionEntity, target: any, result$?: Subject<any>) {
        console.log(transaction)
        this.visible = true;
        this.result$ = result$!;
        this.transaction = structuredClone(transaction);
        this.transaction.value = this.calculateResidualValue();
        this.transaction.account = '';
        this.transaction.accountId = 0
        this.transaction.paymentDate = new Date();
        void this.loadingAccounts();
    }

    processPayment() {
        if (this.transaction.paymentDate) {
            this.invoiceService.pay(this.transaction, this.transaction.paymentDate).then(() => {
                this.alertService.success("Fatura paga com sucesso.");
                this.result$.next(true);
                this.result$.complete();
                this.visible = false;
            });
        }
    }

    formInValid() {
        if (this.transaction.accountId === 0) return true;
        return this.transaction.value === 0;
    }

    private calculateResidualValue() {
        if (this.transaction.residualValue) {
            return NumberHelpers.invertSignalWhenNegative(this.transaction.residualValue);
        }
        return NumberHelpers.invertSignalWhenNegative(this.transaction.value);
    }

    private async loadingAccounts() {
        this.accounts = await this.accountService.findAll().then(response => {
            const onlyActiveAccounts = response.filter(ac => ac.active);
            return [ { id: 0, name: 'Selecione' }, ...onlyActiveAccounts ];
        });
    }
}
