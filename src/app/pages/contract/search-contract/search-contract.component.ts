import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../service/AlertService";
import {ContractService} from "../contract.service";
import {Table} from "primeng/table";
import {ContractEntity} from "../../../../entity/ContractEntity";
import {GlobalDialogService, TypeDialog} from "../../../../shared/service/GlobalDialogService";
import {AuthService} from "../../../core/login/auth.service";
import {ErrorHandler} from "../../../core/handler/ErrorHandler";

@Component({
  selector: 'app-search-contract',
  templateUrl: './search-contract.component.html',
  styleUrls: ['./search-contract.component.css']
})
export class SearchContractComponent implements OnInit {

    contracts = new Array<ContractEntity>();
    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private globalDialogService: GlobalDialogService,
                protected authService: AuthService,
                private error: ErrorHandler,
                private contractService: ContractService) {
    }

    ngOnInit(): void {
        this.contractService.findAll().then(response => {
            this.contracts = response;
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
            this.contracts = this.contracts.filter(v => v.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.contractService.findBy(this.searchFilter).then(response => {
            this.contracts = response;
            this.table?.reset();
        });
    }
}
