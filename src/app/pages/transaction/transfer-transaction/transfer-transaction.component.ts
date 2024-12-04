import {Component, Input, OnInit} from '@angular/core';
import {TransactionEntity} from "../../../../entity/TransactionEntity";
import {AccountEntity} from "../../../../entity/AccountEntity";
import {AlertService} from "../../../../service/AlertService";
import {AccountService} from "../../account/account.service";
import {BaseTransaction} from "../../../../abstract/BaseTransaction";

@Component({
  selector: 'app-transfer-transaction',
  templateUrl: './transfer-transaction.component.html',
  styleUrls: ['./transfer-transaction.component.css']
})
export class TransferTransactionComponent extends BaseTransaction implements OnInit {

    accounts = new Array<AccountEntity>();

    @Input() transaction: TransactionEntity;

    constructor(private accountService: AccountService,
        private alertService: AlertService) {
        super();
    }

    async ngOnInit() {
        await this.accountService.findAll().then(response => {
            this.accounts = response;
        });
    }

    equalsAccount() {
        if (this.transaction.accountId === this.transaction.destinationAccountId) {
            this.alertService.error("Não é permitido realizar uma transferência para a mesma conta.");
            return;
        }
    }
}
