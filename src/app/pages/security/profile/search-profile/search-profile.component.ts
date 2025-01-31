import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../../service/AlertService";
import {ProfileService} from "../profile.service";
import {PartnerEntity} from "../../../../../entity/PartnerEntity";

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrls: ['./search-profile.component.css']
})
export class SearchProfileComponent implements OnInit {
    partners = new Array<PartnerEntity>();

    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private profileService: ProfileService) {
    }

    async ngOnInit() {
        this.profileService.findAll().then(response => {
            this.partners = response;
        });
    }

    confirmationDelete(partner: PartnerEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir o sócio ${partner['name']}?`,
            accept: () => {
                this.delete(partner.id);
            }
        })
    }

    delete(id: number) {
        this.profileService.delete(id).then(() => {
            this.partners = this.partners.filter(a => a.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.profileService.findBy(this.searchFilter).then(response => {
            this.partners = response;
            this.table?.reset();
        })
    }
}
