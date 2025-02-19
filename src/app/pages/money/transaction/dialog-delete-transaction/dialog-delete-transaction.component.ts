import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AlertService} from "../../../../../service/AlertService";
import {TransactionEntity} from "../../../../../entity/TransactionEntity";
import {TransactionService} from "../transaction.service";

@Component({
  selector: 'app-dialog-delete-transaction',
  templateUrl: './dialog-delete-transaction.component.html',
  styleUrls: ['./dialog-delete-transaction.component.css']
})
export class DialogDeleteTransactionComponent implements OnInit {

    visible = false;
    transaction = new TransactionEntity();

    @Output() transactionDeleted = new EventEmitter<void>();

    constructor(private alertService: AlertService,
                private transactionService: TransactionService) {
    }

    ngOnInit(): void {

    }

    showDialog(transaction: TransactionEntity) {
        this.visible = true;
        this.transaction = transaction;
    }

    delete(batch: boolean = false) {
        if (batch) {
            this.transactionService.batchDelete(this.transaction.id).then(() => {
                this.alertService.success("Lançamentos excluídos com sucesso.");
                this.transactionDeleted.emit();
                this.visible = false;
            });
        }
        else {
            this.transactionService.delete(this.transaction.id).then(() => {
                this.alertService.success("Lançamento excluido com sucesso.");
                this.transactionDeleted.emit();
                this.visible = false;
            });
        }
    }

    get description() {
        return this.transaction ? this.transaction.description : '';
    }
}
