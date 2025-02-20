import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ConfirmationService} from "primeng/api";
import {UserService} from "../user.service";
import {AlertService} from "../../../../../service/AlertService";
import {AuthService} from "../../../../core/login/auth.service";
import {UserEntity} from "../../../../../entity/UserEntity";

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
    users = new Array<UserEntity>();

    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                protected authService: AuthService,
                private userService: UserService) {
    }

    async ngOnInit() {
        this.userService.findAll().then(response => {
            this.users = response;
        });
    }

    confirmationDelete(user: UserEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir o usuário ${user['name']}?`,
            accept: () => {
                this.delete(user.id);
            }
        })
    }

    delete(id: number) {
        this.userService.delete(id).then(() => {
            this.users = this.users.filter(a => a.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.userService.findBy(this.searchFilter).then(response => {
            this.users = response;
            this.table?.reset();
        })
    }
}
