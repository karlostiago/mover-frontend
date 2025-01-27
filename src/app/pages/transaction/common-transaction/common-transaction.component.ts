import {Component, Input, OnInit} from '@angular/core';
import {TransactionEntity} from "../../../../entity/TransactionEntity";
import {AccountEntity} from "../../../../entity/AccountEntity";
import {AccountService} from "../../account/account.service";
import {BaseTransaction} from "../../../../abstract/BaseTransaction";
import {VehicleEntity} from "../../../../entity/VehicleEntity";
import {ContractEntity} from "../../../../entity/ContractEntity";
import {CardEntity} from "../../../../entity/CardEntity";
import {LoaderService} from "../../../core/loader/loader.service";
import {CardService} from "../../card/card.service";
import {VehicleService} from "../../vehicle/vehicle.service";
import {ContractService} from "../../contract/contract.service";

@Component({
  selector: 'app-common-transaction',
  templateUrl: './common-transaction.component.html',
  styleUrls: ['./common-transaction.component.css']
})
export class CommonTransactionComponent extends BaseTransaction implements OnInit {

    accounts = new Array<AccountEntity>();
    vehicles = new Array<VehicleEntity>();
    contracts = new Array<ContractEntity>();
    cards = new Array<CardEntity>();

    @Input() transaction: TransactionEntity;
    @Input() updateForm: boolean;

    constructor(private accountService: AccountService,
                private cardService: CardService,
                private contractService: ContractService,
                private vehicleService: VehicleService,
                private loadService: LoaderService) {
        super();
    }

    async ngOnInit() {
        await this.loadingAccounts();
        await this.loadingVehicles();
        await this.loadingContracts();

        if (this.updateForm) {
            this.onChangeContract();
            this.onChangeCard();
        }
    }

    onChangeCard() {
        this.loadService.automatic = false;
        this.cardService.findAll().then(response => {
            // @ts-ignore
            this.cards = [{ id: 0, name: 'Selecione'}, ...response.filter(c => c.accountId === this.transaction['accountId'])];
            this.loadService.automatic = true;
        });
    }

    onChangeContract() {
        this.loadService.automatic = false;
        this.loadingContracts().then(response => {
            // @ts-ignore
            this.contracts = [{ id: 0, number: 'Selecione' }, ...response.filter(c => c.vehicleId === this.transaction['vehicleId'])];
            this.loadService.automatic = true;
        })
    }

    private async loadingAccounts() {
        await this.accountService.findAll().then(response => {
            // @ts-ignore
            this.accounts = [{ id: 0, name: 'Selecione'}, ...response];
        });
    }

    private async loadingVehicles() {
        await this.vehicleService.findAll().then(response => {
            // @ts-ignore
            this.vehicles = [{ id: 0, fullname: 'Selecione'}, ...response];
        });
    }

    private async loadingContracts() {
        return await this.contractService.findAll();
    }
}
