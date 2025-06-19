import {Component, OnInit} from '@angular/core';
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
    transaction = new TransactionEntity();

    constructor(private alertService: AlertService,
                private transactionService: TransactionService) {
    }

    ngOnInit(): void {

    }

    showDialog(transaction: TransactionEntity, target?: any, result$?: Subject<any>) {
        this.visible = true;
        this.result$ = result$!;
        this.transaction = transaction;
    }

    delete(batch: boolean = false) {
        if (batch) {
            this.transactionService.batchDelete(this.transaction.id).then(() => {
                this.alertService.success("Lançamentos excluídos com sucesso.");
                this.visible = false;
                this.result$.next({
                    transaction: this.transaction,
                    batch: true,
                });
                this.result$.complete();
            });
        }
        else {
            this.transactionService.delete(this.transaction.id).then(() => {
                this.alertService.success("Lançamento excluido com sucesso.");
                this.visible = false;
                this.result$.next({
                    transaction: this.transaction,
                    batch: false,
                });
                this.result$.complete();
            });
        }
    }

    get description() {
        return this.transaction ? this.transaction.description : '';
    }
}
