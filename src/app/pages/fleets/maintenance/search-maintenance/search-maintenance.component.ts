import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../../shared/service/AlertService";
import {MaintenanceService} from "../maintenance.service";
import {MaintenanceEntity} from "../../../../../entity/MaintenanceEntity";
import {AuthService} from "../../../../core/login/auth.service";
import {AbstractSearch} from "../../../../../abstract/AbstractSearch";
import {NumberHelpers} from "../../../../../shared/helper/NumberHelpers";

@Component({
  selector: 'app-search-maintenance',
  templateUrl: './search-maintenance.component.html',
  styleUrls: ['./search-maintenance.component.css']
})
export class SearchMaintenanceComponent extends AbstractSearch implements OnInit {

    maintenances = new Array<MaintenanceEntity>();
    searchFilter: string = "";

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                protected authService: AuthService,
                private maintenanceService: MaintenanceService) {
        super();
    }

    ngOnInit(): void {
        this.maintenanceService.findAll().then(response => {
            this.maintenances = super.findAll(response);
        });
    }

    confirmationDelete(maintenance: MaintenanceEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir essa manutenção para o veículo ${maintenance['vehicleName']}?`,
            accept: () => {
                this.delete(maintenance.id);
            }
        })
    }

    delete(id: number) {
        this.maintenanceService.delete(id).then(() => {
            this.maintenances = super.deleteById(id, this.maintenances);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.maintenanceService.findBy(this.searchFilter).then(response => {
            this.maintenances = response;
        });
    }

    createFieldsSidebarDetails(): void {
        this.fields = [
            { label: 'Veículo', value: this.selectedValue.vehicleName, col: 4, visible: true },
            { label: 'Estabelecimento', value: this.selectedValue.establishment, col: 6, visible: true },
            { label: 'Data do serviço', value: this.selectedValue.date, col: 2, visible: true },
            { label: 'Conta', value: this.selectedValue.account, col: 3, visible: true },
            { label: 'Cartão', value: this.selectedValue.card, col: 3, visible: this.selectedValue.card },
            { label: 'Cartão', value: '', col: 3, visible: !this.selectedValue.card },
            { label: 'KM Registrado', value: this.selectedValue.mileage, col: 2, visible: true },
            { label: 'Tipo', value: this.selectedValue.type, col: 2, visible: true },
            { label: 'Valor do serviço', value: NumberHelpers.currencyBRL(this.selectedValue.value), col: 2, visible: true },
            { label: 'Detalhe do que foi realizado', value: this.selectedValue.detail, col: 12, visible: true },
            { label: 'Ativo', value: this.selectedValue.active ? 'SIM' : 'NÃO', col: 1, visible: true }
        ]
    }
}
