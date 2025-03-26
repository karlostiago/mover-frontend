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
import {MaskHelpers} from "../../../../../shared/MaskHelpers";
import {NumberHelpers} from "../../../../../shared/NumberHelpers";
import {DateHelpers} from "../../../../../shared/DateHelpers";

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

    async close(contract: ContractEntity) {
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
            { label: 'Número', value: this.selectedValue.number, col: 2, visible: true },
            { label: 'Veículo', value: this.selectedValue.vehicleName, col: 3, visible: true },
            { label: 'Cliente', value: this.selectedValue.clientName, col: 3, visible: true },
            { label: 'Contato do cliente', value: MaskHelpers.maskTelephone(this.selectedValue.clientContact), col: 2, visible: true },
            { label: 'Ciclo de pagamento', value: this.selectedValue.paymentFrequency, col: 2, visible: true },
            { label: 'Dia do pagamento', value: this.selectedValue.paymentDay, col: 2, visible: true },
            { label: 'Valor caução', value: NumberHelpers.currencyBRL(this.selectedValue.depositAmount), col: 2, visible: true },
            { label: 'Valor recorrencia', value: NumberHelpers.currencyBRL(this.selectedValue.recurrenceValue), col: 3, visible: true },
            { label: 'Situação', value: this.selectedValue.situation, col: 2, visible: true },
            { label: 'Data encerramento', value: DateHelpers.parseToPtBr(this.selectedValue.endDate), col: 2, visible: !!this.selectedValue.endDate },
            { label: 'Ativo', value: this.selectedValue.active ? 'SIM' : 'NÃO', col: 1, visible: true },
            { label: 'Motivo', value: this.selectedValue.reason, col: 12, visible: !!this.selectedValue.endDate }
        ]
    }
}
