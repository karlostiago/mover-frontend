import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../service/AlertService";
import {ConfigurationService} from "../configuration.service";
import {ModelEntity} from "../../../../entity/ModelEntity";
import {ConfigurationEntity} from "../../../../entity/ConfigurationEntity";
import {TypeValueEntity} from "../../../../entity/TypeValueEntity";
import {AuthService} from "../../../core/login/auth.service";

@Component({
  selector: 'app-search-configuration',
  templateUrl: './search-configuration.component.html',
  styleUrls: ['./search-configuration.component.css']
})
export class SearchConfigurationComponent implements OnInit {
    models = new Array<ModelEntity>();
    typesValue = new Array<TypeValueEntity>();
    configurations = new Array<ConfigurationEntity>();

    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                protected authService: AuthService,
                private configurationService: ConfigurationService) {
    }

    ngOnInit(): void {
        this.loadingTypes();
        this.configurationService.findAll().then(response => {
            this.configurations = response;
        });
    }

    confirmationDelete(configuration: ConfigurationEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir a configuração ${configuration['key']}?`,
            accept: () => {
                this.delete(configuration.id);
            }
        })
    }

    delete(id: number) {
        this.configurationService.delete(id).then(() => {
            this.configurations = this.configurations.filter(m => m.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.configurationService.findBy(this.searchFilter).then(response => {
            this.configurations = response;
            this.table?.reset();
        })
    }

    getTypeDescriptionValue(code: string) {
        return this.typesValue.filter(t => t.code === parseInt(code))[0].description;
    }

    private loadingTypes() {
        this.configurationService.findAllTypesValue().then(response => {
            this.typesValue = response;
        });
    }
}
