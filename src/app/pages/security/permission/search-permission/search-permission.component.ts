import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../../service/AlertService";
import {PermissionService} from "../permission.service";
import {PartnerEntity} from "../../../../../entity/PartnerEntity";

@Component({
  selector: 'app-search-permission',
  templateUrl: './search-permission.component.html',
  styleUrls: ['./search-permission.component.css']
})
export class SearchPermissionComponent implements OnInit {
    partners = new Array<PartnerEntity>();

    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private permissionService: PermissionService) {
    }

    async ngOnInit() {
        this.permissionService.findAll().then(response => {
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
        this.permissionService.delete(id).then(() => {
            this.partners = this.partners.filter(a => a.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.permissionService.findBy(this.searchFilter).then(response => {
            this.partners = response;
            this.table?.reset();
        })
    }
}
