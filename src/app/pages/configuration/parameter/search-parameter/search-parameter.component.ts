import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../../service/AlertService";
import {ParameterService} from "../parameter.service";
import {ModelEntity} from "../../../../../entity/ModelEntity";
import {ParameterEntity} from "../../../../../entity/ParameterEntity";
import {TypeValueEntity} from "../../../../../entity/TypeValueEntity";
import {AuthService} from "../../../../core/login/auth.service";

@Component({
  selector: 'app-search-parameter',
  templateUrl: './search-parameter.component.html',
  styleUrls: ['./search-parameter.component.css']
})
export class SearchParameterComponent implements OnInit {
    models = new Array<ModelEntity>();
    typesValue = new Array<TypeValueEntity>();
    parameters = new Array<ParameterEntity>();

    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                protected authService: AuthService,
                private parameterService: ParameterService) {
    }

    ngOnInit(): void {
        this.loadingTypes();
        this.parameterService.findAll().then(response => {
            this.parameters = response;
        });
    }

    confirmationDelete(configuration: ParameterEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir a configuração ${configuration['key']}?`,
            accept: () => {
                this.delete(configuration.id);
            }
        })
    }

    delete(id: number) {
        this.parameterService.delete(id).then(() => {
            this.parameters = this.parameters.filter(m => m.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.parameterService.findBy(this.searchFilter).then(response => {
            this.parameters = response;
            this.table?.reset();
        })
    }

    getTypeDescriptionValue(code: string) {
        return this.typesValue.filter(t => t.code === parseInt(code))[0].description;
    }

    private loadingTypes() {
        this.parameterService.findAllTypesValue().then(response => {
            this.typesValue = response;
        });
    }
}
