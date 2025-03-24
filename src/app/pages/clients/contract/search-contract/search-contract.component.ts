import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../../shared/service/AlertService";
import {ContractService} from "../contract.service";
import {Table} from "primeng/table";
import {ContractEntity} from "../../../../../entity/ContractEntity";
import {GlobalDialogService, TypeDialog} from "../../../../../shared/service/GlobalDialogService";
import {AuthService} from "../../../../core/login/auth.service";
import {ErrorHandler} from "../../../../core/handler/ErrorHandler";
import {AbstractSearch} from "../../../../../abstract/AbstractSearch";

@Component({
  selector: 'app-search-contract',
  templateUrl: './search-contract.component.html',
  styleUrls: ['./search-contract.component.css']
})
export class SearchContractComponent extends AbstractSearch implements OnInit {

    contracts = new Array<ContractEntity>();
    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private globalDialogService: GlobalDialogService,
                protected authService: AuthService,
                private error: ErrorHandler,
                private contractService: ContractService) {
        super();
    }

    ngOnInit(): void {
        this.contractService.findAll().then(response => {
            this.contracts = super.findAll(response);
        });
    }

    close(contract: ContractEntity) {
        if (this.authService.hasPermission('TERMINATION_CONTRACTS')) {
            this.globalDialogService.openDialog(TypeDialog.TERMINATE_CONTRACT, contract);
        } else {
            this.error.capture({ status: 403 })
        }
    }

    confirmationDelete(contract: ContractEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir o contrato de número ${contract['number']} para o cliente ${contract['clientName']}?`,
            accept: () => {
                this.delete(contract.id);
            }
        })
    }

    delete(id: number) {
        this.contractService.delete(id).then(() => {
            this.contracts = super.deleteById(id, this.contracts);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.contractService.findBy(this.searchFilter).then(response => {
            this.contracts = response;
            this.table?.reset();
        });
    }

    createFieldsSidebarDetails(): void {
        this.fields = [
            { label: 'Número', value: this.selectedValue.number, col: 2 },
            { label: 'Veículo', value: this.selectedValue.vehicleName, col: 3 },
            { label: 'Cliente', value: this.selectedValue.clientName, col: 3 },
            { label: 'Forma de pagamento', value: this.selectedValue.paymentFrequency, col: 2 },
            { label: 'Dia do pagamento', value: this.selectedValue.paymentDay, col: 2 },
            { label: 'Valor caução', value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.selectedValue.depositAmount), col: 2 },
            { label: 'Valor recorrencia', value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.selectedValue.recurrenceValue), col: 3 },
            { label: 'Situação', value: this.selectedValue.situation, col: 3 },
            { label: 'Ativo', value: this.selectedValue.active ? 'SIM' : 'NÃO', col: 2 }
        ]
    }
}
