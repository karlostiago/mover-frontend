import {Component, OnInit} from '@angular/core';
import {SymbolEntity} from "../../../../../entity/SymbolEntity";
import {SymbolService} from "../../../../pages/brand/symbol.service";

@Component({
  selector: 'app-dialog-brand-icon',
  templateUrl: './dialog-brand-icon.component.html',
  styleUrls: ['./dialog-brand-icon.component.css']
})
export class DialogBrandIconComponent implements OnInit {

    icons = new Array<SymbolEntity>();
    visible: boolean = false;
    iconSelected: SymbolEntity;
    entitySelected: any;

    constructor(private symbolService: SymbolService) {
    }

    ngOnInit(): void {
    }

    showDialog(icon: SymbolEntity, entity: any) {
        this.entitySelected = entity;
        this.iconSelected = icon;
        this.loadingIcons();
        this.visible = !this.visible;
    }

    select(icon: SymbolEntity) {
        this.iconSelected.id = icon.id;
        this.iconSelected.description = icon.description;
        this.iconSelected.imageBase64 = icon.imageBase64;
        this.entitySelected.symbol = this.iconSelected;
        this.visible = false;
    }

    private loadingIcons() {
        this.symbolService.findAll().then(response => {
            this.icons = response;
        });
    }
}
