import {Component, OnInit} from '@angular/core';
import {BankIconEntity} from "../../../../../entity/BankIconEntity";
import {AccountService} from "../../../../pages/account/account.service";

@Component({
  selector: 'app-dialog-icon-account',
  templateUrl: './dialog-icon-account.component.html',
  styleUrls: ['./dialog-icon-account.component.css']
})
export class DialogIconAccountComponent implements OnInit {

    icons = new Array<BankIconEntity>();
    visible: boolean = false;
    iconSelected: BankIconEntity;
    entitySelected: any;

    constructor(private accountService: AccountService) {
    }

    ngOnInit(): void {
    }

    showDialog(icon: BankIconEntity, entity: any) {
        this.entitySelected = entity;
        this.iconSelected = icon;
        this.resetIcon();
        this.loadingIcons();
        this.visible = !this.visible;
    }

    select(icon: BankIconEntity) {
        this.iconSelected.code = icon.code;
        this.iconSelected.urlImage = icon.urlImage;
        this.entitySelected.imageIcon = icon.urlImage;
        this.entitySelected.codeIcon = icon.code;
        this.visible = false;
    }

    private resetIcon() {
        this.iconSelected.code = 0;
        this.iconSelected.urlImage = '';
        this.entitySelected.imageIcon = '';
        this.entitySelected.codeIcon = 0;
    }

    private loadingIcons() {
        this.accountService.findAllIcons().then(response => {
            this.icons = response;
        });
    }
}
