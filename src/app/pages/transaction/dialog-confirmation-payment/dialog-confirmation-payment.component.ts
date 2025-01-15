import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlertService} from "../../../../service/AlertService";
import {TransactionEntity} from "../../../../entity/TransactionEntity";
import {TransactionService} from "../transaction.service";
import {DateHelpers} from "../../../../shared/DateHelpers";

@Component({
  selector: 'app-dialog-confirmation-payment',
  templateUrl: './dialog-confirmation-payment.component.html',
  styleUrls: ['./dialog-confirmation-payment.component.css']
})
export class DialogConfirmationPaymentComponent implements OnInit {

    @Input() visible = false;

    transaction = new TransactionEntity();

    @Output() transactionPayment = new EventEmitter<void>();

    constructor(private alertService: AlertService,
                private transactionService: TransactionService) {
    }

    ngOnInit(): void {

    }

    showDialog(transaction: TransactionEntity) {
        this.visible = true;
        this.transaction = transaction;
        this.transaction.paymentDate = DateHelpers.toDate(this.transaction.dueDate);
    }

    processPayment() {
        if (this.transaction.paymentDate) {
            this.transactionService.pay(this.transaction.id, this.transaction.paymentDate).then(() => {
                this.alertService.success("Lançamento efetivado com sucesso.");
                this.transactionPayment.emit();
                this.visible = false;
            });
        }
    }

    isValidPaymentDate() {
        return !(this.transaction.paymentDate == null);
    }
}
