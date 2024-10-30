import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../service/AlertService";
import {MaintenanceService} from "../maintenance.service";
import {Table} from "primeng/table";
import {ContractEntity} from "../../../../entity/ContractEntity";
import {GlobalDialogService, TypeDialog} from "../../../../shared/service/GlobalDialogService";

@Component({
  selector: 'app-search-maintenance',
  templateUrl: './search-maintenance.component.html',
  styleUrls: ['./search-maintenance.component.css']
})
export class SearchMaintenanceComponent implements OnInit {

    contracts = new Array<ContractEntity>();
    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private globalDialogService: GlobalDialogService,
                private contractService: MaintenanceService) {
    }

    ngOnInit(): void {
        this.contractService.findAll().then(response => {
            // this.contracts = response;
        });
    }

    close(contract: ContractEntity) {
        this.globalDialogService.openDialog(TypeDialog.TERMINATE_CONTRACT, contract);
    }

    confirmationDelete(contract: ContractEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir esse Contrato?`,
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
            // this.contracts = response;
            this.table?.reset();
        });
    }
}
