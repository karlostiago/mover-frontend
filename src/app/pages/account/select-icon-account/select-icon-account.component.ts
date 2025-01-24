import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BankIconEntity} from "../../../../entity/BankIconEntity";
import {GlobalDialogService, TypeDialog} from "../../../../shared/service/GlobalDialogService";
import {AccountEntity} from "../../../../entity/AccountEntity";

@Component({
  selector: 'app-select-icon-account',
  templateUrl: './select-icon-account.component.html',
  styleUrls: ['./select-icon-account.component.css']
})
export class SelectIconAccountComponent implements OnInit {

    @Input() account: AccountEntity;
    @Input() iconSelected: BankIconEntity
    @Output() selected = new EventEmitter<BankIconEntity>();

    constructor(private globalDialogService: GlobalDialogService) {
    }

    ngOnInit(): void {
        this.iconSelected = new BankIconEntity();
    }

    open() {
        this.globalDialogService.openDialog(TypeDialog.SELECTED_ICON_ACCOUNT, this.iconSelected, this.account);
    }

    select(icon: BankIconEntity) {
        this.iconSelected = icon;
        this.selected.emit(icon);
    }

    hasSelectedIcon() {
        return this.iconSelected?.urlImage ?? false;
    }
}
