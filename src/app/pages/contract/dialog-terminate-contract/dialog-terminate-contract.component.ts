import {Component, Input, OnInit} from '@angular/core';
import {SummaryFipeEntity} from "../../../../entity/SummaryFipeEntity";
import {ContractEntity} from "../../../../entity/ContractEntity";
import {NgForm} from "@angular/forms";
import {ContractService} from "../contract.service";

@Component({
  selector: 'app-dialog-terminate-contract',
  templateUrl: './dialog-terminate-contract.component.html',
  styleUrls: ['./dialog-terminate-contract.component.css']
})
export class DialogTerminateContractComponent implements OnInit {

    @Input() visible = false;

    contract = new ContractEntity();

    summaries: Array<SummaryFipeEntity> = [];

    constructor(private contractService: ContractService) {
    }

    ngOnInit(): void {
    }

    async showDialog(contract: ContractEntity) {
        this.visible = true;
        this.contract = contract;
        this.contract.friendlyTermination = true;
    }

    saveOrUpdate(form: NgForm) {
        this.contractService.close(this.contract).then(response => {
            console.log('encerrado com sucesso.')
        })
    }
}
