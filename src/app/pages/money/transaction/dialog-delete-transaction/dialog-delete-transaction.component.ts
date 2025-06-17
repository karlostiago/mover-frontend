import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AlertService} from "../../../../../shared/service/AlertService";
import {TransactionEntity} from "../../../../../entity/TransactionEntity";
import {TransactionService} from "../transaction.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-dialog-delete-transaction',
  templateUrl: './dialog-delete-transaction.component.html',
  styleUrls: ['./dialog-delete-transaction.component.css']
})
export class DialogDeleteTransactionComponent implements OnInit {

    visible = false;
    result$: Subject<any>;

    invoice = new TransactionEntity();
    transaction = new TransactionEntity();

    @Output() transactionDeleted = new EventEmitter<any>();

    constructor(private alertService: AlertService,
                private transactionService: TransactionService) {
    }

    ngOnInit(): void {

    }

    showDialog(transaction: TransactionEntity, target?: any, result$?: Subject<any>) {
        this.visible = true;
        this.result$ = result$!;
        this.invoice = target;
        this.transaction = transaction;
    }

    delete(batch: boolean = false) {
        if (batch) {
            this.transactionService.batchDelete(this.transaction.id).then(() => {
                this.alertService.success("Lançamentos excluídos com sucesso.");
                this.transactionDeleted.emit({
                    entity: this.transaction,
                    batch: true,
                });
                this.visible = false;
                this.result$.next({
                    invoice: this.invoice
                });
                this.result$.complete();
            });
        }
        else {
            this.transactionService.delete(this.transaction.id).then(() => {
                this.alertService.success("Lançamento excluido com sucesso.");
                this.transactionDeleted.emit({
                    entity: this.transaction,
                    batch: false,
                });
                this.visible = false;
                this.result$.next({
                    invoice: this.invoice
                });
                this.result$.complete();
            });
        }
    }

    get description() {
        return this.transaction ? this.transaction.description : '';
    }
}
