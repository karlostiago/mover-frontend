import {Component, Input, OnInit} from '@angular/core';
import {TransactionEntity} from "../../../../entity/TransactionEntity";
import {AccountEntity} from "../../../../entity/AccountEntity";
import {AccountService} from "../../account/account.service";
import {BaseTransaction} from "../../../../abstract/BaseTransaction";

@Component({
  selector: 'app-transfer-transaction',
  templateUrl: './transfer-transaction.component.html',
  styleUrls: ['./transfer-transaction.component.css']
})
export class TransferTransactionComponent extends BaseTransaction implements OnInit {

    accounts = new Array<AccountEntity>();
    debitAccounts = new Array<AccountEntity>();
    creditAccounts = new Array<AccountEntity>();

    @Input() transaction: TransactionEntity;

    constructor(private accountService: AccountService) {
        super();
    }

    async ngOnInit() {
        await this.accountService.findAll().then(response => {
            // @ts-ignore
            this.debitAccounts = [ { id: 0, name: 'Selecione' }, ...response ];
            // @ts-ignore
            this.creditAccounts = [ { id: 0, name: 'Selecione' }, ...response ];
            // @ts-ignore
            this.accounts = [ { id: 0, name: 'Selecione' }, ...response ];
        });
    }

    removeAccount(id: number, debit: boolean) {
        if (debit) {
            this.creditAccounts = this.accounts.filter(c => c.id !== id);
        } else {
            this.debitAccounts = this.accounts.filter(c => c.id !== id);
        }
    }
}
