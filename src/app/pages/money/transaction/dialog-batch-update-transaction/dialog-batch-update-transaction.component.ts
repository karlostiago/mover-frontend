import {Component, OnInit} from '@angular/core';
import {AlertService} from "../../../../../shared/service/AlertService";
import {TransactionEntity} from "../../../../../entity/TransactionEntity";
import {TransactionService} from "../transaction.service";

@Component({
  selector: 'app-dialog-batch-update-transaction',
  templateUrl: './dialog-batch-update-transaction.component.html',
  styleUrls: ['./dialog-batch-update-transaction.component.css']
})
export class DialogBatchUpdateTransactionComponent implements OnInit {

    visible = false;
    transaction = new TransactionEntity();

    constructor(private alertService: AlertService,
                private transactionService: TransactionService) {
    }

    ngOnInit(): void {

    }

    showDialog(transaction: TransactionEntity) {
        this.visible = true;
        this.transaction = transaction;
    }

    update(batch: boolean = false) {
        if (batch) {
            this.transactionService.batchUpdate(this.transaction.id, this.transaction).then(() => {
                this.alertService.success("Registro foi atualizado com sucesso, os demais registros serão atualizados em segundo plano, em alguns segundos estará disponivel em tela.");
                this.visible = false;
            });
        } else {
            this.transactionService.update(this.transaction.id, this.transaction).then(() => {
                this.alertService.success("Registro atualizado com sucesso.");
                this.visible = false;
            });
        }
    }
}
