import {Component, Input, OnInit} from '@angular/core';
import {ContractEntity} from "../../../../entity/ContractEntity";
import {NgForm} from "@angular/forms";
import {MaintenanceService} from "../maintenance.service";
import {AlertService} from "../../../../service/AlertService";

@Component({
  selector: 'app-dialog-terminate-contract',
  templateUrl: './dialog-terminate-contract.component.html',
  styleUrls: ['./dialog-terminate-contract.component.css']
})
export class DialogTerminateContractComponent implements OnInit {

    @Input() visible = false;

    contract = new ContractEntity();

    constructor(private contractService: MaintenanceService,
                private alertService: AlertService,) {
    }

    ngOnInit(): void {
    }

    async showDialog(contract: ContractEntity) {
        this.visible = true;
        this.contract = contract;
        this.contract.friendlyTermination = true;
    }

    async saveOrUpdate(form: NgForm) {
        this.contract.situation = 'ENCERRADO';
        this.contract.active = false;
        this.contract.endDate = new Date();
        this.visible = false;
        this.alertService.success("Contrato encerrado com sucesso.");
        this.contractService.close(this.contract).then(() => { });
    }
}
