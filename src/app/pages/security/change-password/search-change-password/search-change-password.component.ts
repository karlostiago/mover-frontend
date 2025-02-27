import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ChangePasswordService} from "../change-password.service";
import {AlertService} from "../../../../../shared/service/AlertService";
import {AuthService} from "../../../../core/login/auth.service";
import {UserEntity} from "../../../../../entity/UserEntity";

@Component({
  selector: 'app-search-change-password',
  templateUrl: './search-change-password.component.html',
  styleUrls: ['./search-change-password.component.css']
})
export class SearchChangePasswordComponent implements OnInit {
    users = new Array<UserEntity>();
    usersFiltered = new Array<UserEntity>();

    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private alertService: AlertService,
                protected authService: AuthService,
                private userService: ChangePasswordService) {
    }

    async ngOnInit() {
        await this.authService.recoverLogin();
        await this.authService.isRootUser();
        this.userService.findAll().then(response => {
            this.users = response;
            if (this.authService.rootUser) {
                this.usersFiltered = this.users;
            } else {
                this.users = response.filter(user => user.login === this.authService.username);
                this.usersFiltered = this.users;
            }
        });
    }

    filterBy() {
        this.table?.reset();
        if (this.searchFilter) {
            this.usersFiltered = this.users.filter(user =>
                user['login'].toLowerCase().includes(this.searchFilter.toLowerCase()));
        } else {
            this.usersFiltered = this.users;
        }
    }
}
