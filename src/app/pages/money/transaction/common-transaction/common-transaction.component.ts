import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransactionEntity} from "../../../../../entity/TransactionEntity";
import {AccountService} from "../../../configuration/account/account.service";
import {BaseTransaction} from "../../../../../abstract/BaseTransaction";
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

    cards = new Array<any>();
    accounts = new Array<any>();
    vehicles = new Array<any>();
    contracts = new Array<any>();

    private selectedContracts = new Array<any>();
    private selectedCards = new Array<any>();

    @Input() transaction: TransactionEntity;
    @Output() calculateCutOfDate = new EventEmitter<TransactionEntity>();

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
                this.filterCardByAccount();
            }
            if (this.transaction.vehicleId > 0) {
                this.filterContractByVehicleId();
            }
        }, 1000);
    }

    onChangeFilterCard() {
        this.filterCardByAccount();
        this.transaction['cardId'] = 0;
    }

    onChangeFilterContract() {
       this.filterContractByVehicleId();
       this.transaction['contractId'] = 0;
    }

    private async loadingAccounts() {
        await this.accountService.findAll().then(response => {
            const onlyActiveAccounts = response.filter(r => r.active);
            this.accounts = [{ id: 0, name: 'Selecione'}, ...onlyActiveAccounts];
        });
    }

    private async loadingVehicles() {
        await this.vehicleService.findAll().then(response => {
            this.vehicles = [{ id: 0, fullname: 'Selecione'}, ...response];
        });
    }

    private async loadingCards() {
        return await this.cardService.findAll().then(response => {
            this.cards = [{ id: 0, name: 'Selecione'}, ...response];
            this.selectedCards = [{ id: 0, name: 'Selecione'}, ...response];
        });
    }

    private async loadingContracts() {
        return await this.contractService.findAll().then(response => {
            const contractsFilters = response.filter(r => r.situation !== 'ENCERRADO' && r.active);
            this.contracts = [{ id: 0, number: 'Selecione'}, ...contractsFilters];
            this.selectedContracts = [{ id: 0, number: 'Selecione'}, ...contractsFilters];
        });
    }

    private filterCardByAccount() {
        this.cards = [ { id: 0, name: 'Selecione' }, ...this.selectedCards.filter(c => c.accountId === this.transaction['accountId'])];
    }

    private filterContractByVehicleId() {
        this.contracts = [{ id: 0, number: 'Selecione' }, ...this.selectedContracts.filter(c => c.vehicleId === this.transaction['vehicleId'])];
    }
}
