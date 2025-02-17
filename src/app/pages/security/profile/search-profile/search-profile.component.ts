import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../../service/AlertService";
import {ProfileService} from "../profile.service";
import {ProfileEntity} from "../../../../../entity/ProfileEntity";
import {AuthService} from "../../../../core/login/auth.service";

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrls: ['./search-profile.component.css']
})
export class SearchProfileComponent implements OnInit {
    profiles = new Array<ProfileEntity>();

    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                protected authService: AuthService,
                private profileService: ProfileService) {
    }

    async ngOnInit() {
        this.profileService.findAll().then(response => {
            this.profiles = response;
        });
    }

    confirmationDelete(profile: ProfileEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir o perfil ${profile['description']}?`,
            accept: () => {
                this.delete(profile.id);
            }
        })
    }

    delete(id: number) {
        this.profileService.delete(id).then(() => {
            this.profiles = this.profiles.filter(a => a.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.profileService.findBy(this.searchFilter).then(response => {
            this.profiles = response;
            this.table?.reset();
        })
    }
}
