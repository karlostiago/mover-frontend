import {Component, Input, OnInit} from '@angular/core';
import {TransactionEntity} from "../../../../../entity/TransactionEntity";
import {AccountEntity} from "../../../../../entity/AccountEntity";
import {AccountService} from "../../../configuration/account/account.service";
import {BaseTransaction} from "../../../../../abstract/BaseTransaction";
import {VehicleEntity} from "../../../../../entity/VehicleEntity";
import {ContractEntity} from "../../../../../entity/ContractEntity";
import {CardEntity} from "../../../../../entity/CardEntity";
import {LoaderService} from "../../../../core/loader/loader.service";
import {CardService} from "../../../configuration/card/card.service";
import {VehicleService} from "../../../fleets/vehicle/vehicle.service";
import {ContractService} from "../../../clients/contract/contract.service";
import {TransactionService} from "../transaction.service";

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

    constructor(private accountService: AccountService,
                private cardService: CardService,
                private contractService: ContractService,
                private vehicleService: VehicleService,
                private transactionService: TransactionService,
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

        setTimeout(() => {
            if (this.transaction.accountId > 0) {
                this.onChangeCard();
            }
            if (this.transaction.vehicleId > 0) {
                this.onChangeContract();
            }
        }, 1000);
    }

    onChangeCard() {
        // @ts-ignore
        this.cards = [ { id: 0, name: 'Selecione' }, ...this.selectedCards.filter(c => c.accountId === this.transaction['accountId'])];
        this.transaction.dueDate = null;
        this.transaction.cardId = 0;
    }

    onChangeContract() {
        // @ts-ignore
       this.contracts = [{ id: 0, number: 'Selecione' }, ...this.selectedContracts.filter(c => c.vehicleId === this.transaction['vehicleId'])];
    }

    onCalculateCutOfDate() {
        if (this.transaction.cardId === 0) {
            this.transaction.dueDate = null;
            return;
        }

        this.loadService.automatic = false;
        this.transactionService.calculateCutOffDate(this.transaction).then(response => {
            this.transaction.dueDate = response.dueDate;
        }).finally(() => {
            this.loadService.automatic = true;
        });
    }

    private async loadingAccounts() {
        await this.accountService.findAll().then(response => {
            const onlyActiveAccounts = response.filter(r => r.active);
            // @ts-ignore
            this.accounts = [{ id: 0, name: 'Selecione'}, ...onlyActiveAccounts];
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
            const contractsFilters = response.filter(r => r.situation !== 'ENCERRADO' && r.active);
            // @ts-ignore
            this.contracts = [{ id: 0, number: 'Selecione'}, ...contractsFilters];
            // @ts-ignore
            this.selectedContracts = [{ id: 0, number: 'Selecione'}, ...contractsFilters];
        });
    }
}
