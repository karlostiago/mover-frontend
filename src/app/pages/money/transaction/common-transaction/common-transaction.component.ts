import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransactionEntity} from "../../../../../entity/TransactionEntity";
import {AccountService} from "../../../configuration/account/account.service";
import {BaseTransaction} from "../../../../../abstract/BaseTransaction";
import {CardService} from "../../../configuration/card/card.service";
import {VehicleService} from "../../../fleets/vehicle/vehicle.service";
import {ContractService} from "../../../clients/contract/contract.service";

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
    @Input() invoices = new Array<any>();

    @Output() calculateCutOfDate = new EventEmitter<TransactionEntity>();

    constructor(private accountService: AccountService,
                private cardService: CardService,
                private contractService: ContractService,
                private vehicleService: VehicleService) {
        super();
    }

    async ngOnInit() {
        await Promise.all([
            this.loadingAccounts(),
            this.loadingVehicles(),
            this.loadingContracts(),
            this.loadingCards()
        ]);

        if (this.transaction.accountId > 0) {
            this.filterCardByAccount();
        }
        if (this.transaction.vehicleId > 0) {
            this.filterContractByVehicleId();
        }
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
        const response = await this.accountService.findAll();
        const onlyActiveAccounts = response.filter(r => r.active);
        this.accounts = [{ id: 0, name: 'Selecione'}, ...onlyActiveAccounts];
    }

    private async loadingVehicles() {
        const response = await this.vehicleService.findAll();
        this.vehicles = [{ id: 0, fullname: 'Selecione'}, ...response];
    }

    private async loadingCards() {
        const response = await this.cardService.findAll();
        this.cards = [{ id: 0, name: 'Selecione'}, ...response];
        this.selectedCards = [{ id: 0, name: 'Selecione'}, ...response];
    }

    private async loadingContracts() {
        const response = await this.contractService.findAll();
        const contractsFilters = response.filter(r => r.situation !== 'ENCERRADO' && r.active);
        this.contracts = [{ id: 0, number: 'Selecione'}, ...contractsFilters];
        this.selectedContracts = [{ id: 0, number: 'Selecione'}, ...contractsFilters];
    }

    private filterCardByAccount() {
        this.cards = [ { id: 0, name: 'Selecione' }, ...this.selectedCards.filter(c => c.accountId === this.transaction['accountId'])];
    }

    private filterContractByVehicleId() {
        this.contracts = [{ id: 0, number: 'Selecione' }, ...this.selectedContracts.filter(c => c.vehicleId === this.transaction['vehicleId'])];
    }
}
