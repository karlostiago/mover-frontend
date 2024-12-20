import {Component, Input, OnInit} from '@angular/core';
import {TransactionEntity} from "../../../../entity/TransactionEntity";
import {AccountEntity} from "../../../../entity/AccountEntity";
import {AccountService} from "../../account/account.service";
import {BaseTransaction} from "../../../../abstract/BaseTransaction";
import {PartnerEntity} from "../../../../entity/PartnerEntity";
import {PartnerService} from "../../partner/partner.service";

@Component({
  selector: 'app-corporate-capital-transaction',
  templateUrl: './corporate-capital-transaction.component.html',
  styleUrls: ['./corporate-capital-transaction.component.css']
})
export class CorporateCapitalTransactionComponent extends BaseTransaction implements OnInit {

    accounts = new Array<AccountEntity>();
    partners = new Array<PartnerEntity>();

    @Input() transaction: TransactionEntity;

    constructor(private accountService: AccountService,
        private partnerService: PartnerService) {
        super();
    }

    async ngOnInit() {
        await this.loadingAccount();
        await this.loadingPartners();
    }

    private async loadingAccount() {
        this.accountService.findAll().then(response => {
            // @ts-ignore
            this.accounts = [{ id: 0, name: 'Selecione' }, ...response];
        });
    }

    private async loadingPartners() {
        this.partnerService.findAll().then(response => {
            // @ts-ignore
            this.partners = [{ id: 0, name: 'Selecione' }, ...response];
        });
    }
}
