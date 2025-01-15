import {Component, Input, OnInit} from '@angular/core';
import {AlertService} from "../../../../service/AlertService";
import {TransactionEntity} from "../../../../entity/TransactionEntity";
import {TransactionService} from "../transaction.service";

@Component({
  selector: 'app-dialog-update-fixed-transaction',
  templateUrl: './dialog-update-fixed-transaction.component.html',
  styleUrls: ['./dialog-update-fixed-transaction.component.css']
})
export class DialogUpdateFixedTransactionComponent implements OnInit {

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

    updateOnlyThis() {
        this.transactionService.update(this.transaction.id, this.transaction).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
            this.visible = false;
        });
    }

    updateThisAndNext() {
        // this.transactionService.remove(this.transaction.id, false).then(() => {
        //     this.alertService.success("Lançamentos atualizados com sucesso.");
        //     this.visible = false;
        // });
        console.log('atualizando este e os proximos', this.transaction)
    }
}
