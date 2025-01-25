import {Component, Input, OnInit} from '@angular/core';
import {BankIconEntity} from "../../../../entity/BankIconEntity";
import {GlobalDialogService, TypeDialog} from "../../../../shared/service/GlobalDialogService";

@Component({
  selector: 'app-select-icon',
  templateUrl: './select-icon.component.html',
  styleUrls: ['./select-icon.component.css']
})
export class SelectIconComponent implements OnInit {

    @Input() entity: any;
    @Input() iconSelected: BankIconEntity

    constructor(private globalDialogService: GlobalDialogService) {
    }

    ngOnInit(): void {
        this.iconSelected = new BankIconEntity();
    }

    open() {
        this.globalDialogService.openDialog(TypeDialog.SELECTED_ICON_ACCOUNT, this.iconSelected, this.entity);
    }

    hasSelectedIcon() {
        return this.iconSelected?.urlImage ?? false;
    }
}
