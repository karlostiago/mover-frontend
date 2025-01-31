import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ConfirmationService} from "primeng/api";
import {UserService} from "../user.service";
import {PartnerEntity} from "../../../../../entity/PartnerEntity";
import {AlertService} from "../../../../../service/AlertService";

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
    partners = new Array<PartnerEntity>();

    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private userService: UserService) {
    }

    async ngOnInit() {
        this.userService.findAll().then(response => {
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
        this.userService.delete(id).then(() => {
            this.partners = this.partners.filter(a => a.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.userService.findBy(this.searchFilter).then(response => {
            this.partners = response;
            this.table?.reset();
        })
    }
}
