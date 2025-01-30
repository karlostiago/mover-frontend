import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../service/AlertService";
import {ModelService} from "../model.service";
import {ModelEntity} from "../../../../entity/ModelEntity";

@Component({
  selector: 'app-search-model',
  templateUrl: './search-model.component.html',
  styleUrls: ['./search-model.component.css']
})
export class SearchModelComponent implements OnInit {
    models = new Array<ModelEntity>();

    searchFilter: string = "";
    yearManufactureFilter: string = "";
    yearModelFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private modelService: ModelService) {
    }

    ngOnInit(): void {
        this.modelService.findAll().then(response => {
            this.models = response;
        });
    }

    confirmationDelete(model: ModelEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir o modelo ${model['name']}?`,
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
            this.models = response;
            this.table?.reset();
        })
    }
}
