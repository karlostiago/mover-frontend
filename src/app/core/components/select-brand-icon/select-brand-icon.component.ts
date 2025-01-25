import {Component, Input, OnInit} from '@angular/core';
import {GlobalDialogService, TypeDialog} from "../../../../shared/service/GlobalDialogService";
import {SymbolEntity} from "../../../../entity/SymbolEntity";

@Component({
  selector: 'app-select-brand-icon',
  templateUrl: './select-brand-icon.component.html',
  styleUrls: ['./select-brand-icon.component.css']
})
export class SelectBrandIconComponent implements OnInit {

    @Input() entity: any;
    @Input() iconSelected: SymbolEntity

    constructor(private globalDialogService: GlobalDialogService) {
    }

    ngOnInit(): void {
        this.iconSelected = new SymbolEntity();
    }

    open() {
        this.globalDialogService.openDialog(TypeDialog.SELECT_BRAND_ICON, this.iconSelected, this.entity);
    }

    hasSelectedIcon() {
        return this.iconSelected?.description ?? false;
    }
}
