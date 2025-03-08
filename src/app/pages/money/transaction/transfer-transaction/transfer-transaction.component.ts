import {Component, Input, OnInit} from '@angular/core';
import {TransactionEntity} from "../../../../../entity/TransactionEntity";
import {AccountEntity} from "../../../../../entity/AccountEntity";
import {AccountService} from "../../../configuration/account/account.service";
import {BaseTransaction} from "../../../../../abstract/BaseTransaction";

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
            const onlyActiveAccounts = response.filter(ac => ac.active);
            // @ts-ignore
            this.debitAccounts = [ { id: 0, name: 'Selecione' }, ...onlyActiveAccounts ];
            // @ts-ignore
            this.creditAccounts = [ { id: 0, name: 'Selecione' }, ...onlyActiveAccounts ];
            // @ts-ignore
            this.accounts = [ { id: 0, name: 'Selecione' }, ...onlyActiveAccounts ];
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
