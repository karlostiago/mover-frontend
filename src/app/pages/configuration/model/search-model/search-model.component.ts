import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../../shared/service/AlertService";
import {ModelService} from "../model.service";
import {ModelEntity} from "../../../../../entity/ModelEntity";
import {AuthService} from "../../../../core/login/auth.service";
import {PaginationHelper} from "../../../../../shared/helper/PaginationHelper";
import {Page} from "../../../../../entity/Page";

@Component({
  selector: 'app-search-model',
  templateUrl: './search-model.component.html',
  styleUrls: ['./search-model.component.css']
})
export class SearchModelComponent implements OnInit {
    pagination = new PaginationHelper<ModelEntity, Page<ModelEntity>>();
    models = new Array<ModelEntity>();
    searchFilter: string = "";

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                protected authService: AuthService,
                private modelService: ModelService) {
    }

    ngOnInit(): void {
        this.pagination.initialization(30);
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
        this.pagination.reset();
        this.pagination.load(
            () => this.modelService.findBy(this.searchFilter, this.pagination.page, this.pagination.size),
            (response) => {
                this.models = response.content;
            }
        );
    }

    loading() {
        this.pagination.load(
            () => this.modelService.searchAll(this.pagination.page, this.pagination.size),
            (response) => {
                this.models = [...this.models, ...response.content];
            }
        );
    }
}
