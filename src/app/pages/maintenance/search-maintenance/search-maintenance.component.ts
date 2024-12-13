import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../service/AlertService";
import {MaintenanceService} from "../maintenance.service";
import {Table} from "primeng/table";
import {ContractEntity} from "../../../../entity/ContractEntity";
import {MaintenanceEntity} from "../../../../entity/MaintenanceEntity";

@Component({
  selector: 'app-search-maintenance',
  templateUrl: './search-maintenance.component.html',
  styleUrls: ['./search-maintenance.component.css']
})
export class SearchMaintenanceComponent implements OnInit {

    maintenances = new Array<MaintenanceEntity>();
    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private maintenanceService: MaintenanceService) {
    }

    ngOnInit(): void {
        this.maintenanceService.findAll().then(response => {
            this.maintenances = response;
        });
    }

    confirmationDelete(contract: ContractEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir essa Manutenção?`,
            accept: () => {
                this.delete(contract.id);
            }
        })
    }

    delete(id: number) {
        this.maintenanceService.delete(id).then(() => {
            this.maintenances = this.maintenances.filter(v => v.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.maintenanceService.findBy(this.searchFilter).then(response => {
            this.maintenances = response;
            this.table?.reset();
        });
    }
}