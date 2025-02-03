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

    private selectedContracts = new Array<ContractEntity>();
    private selectedCards = new Array<CardEntity>();

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
        await Promise.all([
            this.loadingAccounts(),
            this.loadingVehicles(),
            this.loadingContracts(),
            this.loadingCards()
        ]);

        if (this.updateForm) {
            this.onChangeContract();
            this.onChangeCard();
        }
    }

    onChangeCard() {
        // @ts-ignore
        this.cards = [ { id: 0, name: 'Selecione' }, ...this.selectedCards.filter(c => c.accountId === this.transaction['accountId'])];
    }

    onChangeContract() {
        // @ts-ignore
       this.contracts = [{ id: 0, number: 'Selecione' }, ...this.selectedContracts.filter(c => c.vehicleId === this.transaction['vehicleId'])];
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

    private async loadingCards() {
        return await this.cardService.findAll().then(response => {
            // @ts-ignore
            this.cards = [{ id: 0, name: 'Selecione'}, ...response];
            // @ts-ignore
            this.selectedCards = [{ id: 0, name: 'Selecione'}, ...response];
        });
    }

    private async loadingContracts() {
        return await this.contractService.findAll().then(response => {
            // @ts-ignore
            this.contracts = [{ id: 0, number: 'Selecione'}, ...response];
            // @ts-ignore
            this.selectedContracts = [{ id: 0, number: 'Selecione'}, ...response];
        });
    }
}
