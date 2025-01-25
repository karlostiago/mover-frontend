import {Component, Input, OnInit} from '@angular/core';
import {BankIconEntity} from "../../../../entity/BankIconEntity";
import {GlobalDialogService, TypeDialog} from "../../../../shared/service/GlobalDialogService";

@Component({
  selector: 'app-select-bank-icon',
  templateUrl: './select-bank-icon.component.html',
  styleUrls: ['./select-bank-icon.component.css']
})
export class SelectBankIconComponent implements OnInit {

    @Input() entity: any;
    @Input() iconSelected: BankIconEntity

    constructor(private globalDialogService: GlobalDialogService) {
    }

    ngOnInit(): void {
        this.iconSelected = new BankIconEntity();
    }

    open() {
        this.globalDialogService.openDialog(TypeDialog.SELECT_BANK_ICON, this.iconSelected, this.entity);
    }

    hasSelectedIcon() {
        return this.iconSelected?.urlImage ?? false;
    }
}
