import {Component, Input, OnInit} from '@angular/core';
import {ContractEntity} from "../../../../../entity/ContractEntity";
import {ContractService} from "../contract.service";
import {AlertService} from "../../../../../shared/service/AlertService";
import {AuthService} from "../../../../core/login/auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-dialog-terminate-contract',
  templateUrl: './dialog-terminate-contract.component.html',
  styleUrls: ['./dialog-terminate-contract.component.css']
})
export class DialogTerminateContractComponent implements OnInit {

    private closed: string = 'ENCERRADO';
    @Input() visible = false;

    contract = new ContractEntity();

    constructor(private contractService: ContractService,
                protected authService: AuthService,
                private alertService: AlertService,) {
    }

    ngOnInit(): void {
    }

    showDialog(contract: ContractEntity) {
        this.visible = true;
        this.contract = contract;
        this.contract.reason = '';
    }

    saveOrUpdate() {
        this.contractService.close(this.contract).then(() => {
            this.visible = false;
            this.contract.active = false;
            this.contract.endDate = new Date();
            this.contract.situation = this.closed;
            this.contract.currentSituation = this.contract.situation;
            this.alertService.success("Contrato encerrado com sucesso.");
        });
    }
}
