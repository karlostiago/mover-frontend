import {Component, OnInit} from '@angular/core';
import {BankIconEntity} from "../../../../../entity/BankIconEntity";
import {AccountService} from "../../../../pages/configuration/account/account.service";

@Component({
  selector: 'app-dialog-bank-icon',
  templateUrl: './dialog-bank-icon.component.html',
  styleUrls: ['./dialog-bank-icon.component.css']
})
export class DialogBankIconComponent implements OnInit {

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

    private loadingIcons() {
        this.accountService.findAllIcons().then(response => {
            this.icons = response;
        });
    }
}
