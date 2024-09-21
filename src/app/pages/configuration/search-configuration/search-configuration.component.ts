import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../service/AlertService";
import {ConfigurationService} from "../configuration.service";
import {ModelEntity} from "../../../../entity/ModelEntity";

@Component({
  selector: 'app-search-configuration',
  templateUrl: './search-configuration.component.html',
  styleUrls: ['./search-configuration.component.css']
})
export class SearchConfigurationComponent implements OnInit {
    models = new Array<ModelEntity>();

    searchFilter: string = "";
    yearManufactureFilter: string = "";
    yearModelFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private modelService: ConfigurationService) {
    }

    ngOnInit(): void {
        this.modelService.findAll().then(response => {
            // this.models = response;
        });
    }

    confirmationDelete(model: ModelEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir o Modelo?`,
            accept: () => {
                this.delete(model.id);
            }
        })
    }

    delete(id: number) {
        this.modelService.delete(id).then(() => {
            this.models = this.models.filter(m => m.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.modelService.findBy(this.searchFilter).then(response => {
            // this.models = response;
            this.table?.reset();
        })
    }
}
