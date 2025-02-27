import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../../shared/service/AlertService";
import {PartnerService} from "../partner.service";
import {PartnerEntity} from "../../../../../entity/PartnerEntity";
import {AuthService} from "../../../../core/login/auth.service";

@Component({
  selector: 'app-search-partner',
  templateUrl: './search-partner.component.html',
  styleUrls: ['./search-partner.component.css']
})
export class SearchPartnerComponent implements OnInit {
    partners = new Array<PartnerEntity>();

    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                protected authService: AuthService,
                private partnerService: PartnerService) {
    }

    async ngOnInit() {
        this.partnerService.findAll().then(response => {
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
        this.partnerService.delete(id).then(() => {
            this.partners = this.partners.filter(a => a.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.partnerService.findBy(this.searchFilter).then(response => {
            this.partners = response;
            this.table?.reset();
        })
    }
}
