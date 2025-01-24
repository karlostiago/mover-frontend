import {Component, OnInit} from '@angular/core';
import {BankIconEntity} from "../../../../entity/BankIconEntity";
import {AccountService} from "../account.service";
import {AccountEntity} from "../../../../entity/AccountEntity";

@Component({
  selector: 'app-dialog-icon-account',
  templateUrl: './dialog-icon-account.component.html',
  styleUrls: ['./dialog-icon-account.component.css']
})
export class DialogIconAccountComponent implements OnInit {

    icons = new Array<BankIconEntity>();

    visible: boolean = false;

    iconSelected: BankIconEntity;
    accountSelected: AccountEntity;

    constructor(private accountService: AccountService) {
    }

    ngOnInit(): void {
    }

    showDialog(icon: BankIconEntity, account: AccountEntity) {
        this.accountSelected = account;
        this.iconSelected = icon;
        this.resetIcon();
        this.loadingIcons();
        this.visible = !this.visible;
    }

    select(icon: BankIconEntity) {
        this.iconSelected.code = icon.code;
        this.iconSelected.urlImage = icon.urlImage;
        this.accountSelected.imageIcon = icon.urlImage;
        this.accountSelected.codeIcon = icon.code;
        this.visible = false;
    }

    private resetIcon() {
        this.iconSelected.code = 0;
        this.iconSelected.urlImage = '';
        this.accountSelected.imageIcon = '';
        this.accountSelected.codeIcon = 0;
    }

    private loadingIcons() {
        this.accountService.findAllIcons().then(response => {
            this.icons = response;
        });
    }
}
