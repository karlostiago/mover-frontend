import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../../shared/service/AlertService";
import {ClientService} from "../client.service";
import {ClientEntity} from "../../../../../entity/ClientEntity";
import {AuthService} from "../../../../core/login/auth.service";
import {AbstractSearch} from "../../../../../abstract/AbstractSearch";
import {MaskHelpers} from "../../../../../shared/MaskHelpers";

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.css']
})
export class SearchClientComponent extends AbstractSearch implements OnInit {
    clients = new Array<ClientEntity>();
    searchFilter: string = "";

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                protected authService: AuthService,
                private clientService: ClientService) {
        super();
    }

    async ngOnInit() {
        this.clientService.findAll().then(response => {
            this.clients = super.findAll(response);
        });
    }

    confirmationDelete(client: ClientEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir o cliente ${client['name']}?`,
            accept: () => {
                this.delete(client.id);
            }
        })
    }

    delete(id: number) {
        this.clientService.delete(id).then(() => {
            this.clients = super.deleteById(id, this.clients);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.clientService.findBy(this.searchFilter).then(response => {
            this.clients = response;
        })
    }

    createFieldsSidebarDetails(): void {
        this.fields = [
            { label: 'Tipo pessoa', value: 'Pessoa Física', col: 2, visible: this.selectedValue.typePersonCode === 1 },
            { label: 'Tipo pessoa', value: 'Pessoa Jurídica', col: 2, visible: this.selectedValue.typePersonCode === 2 },
            { label: 'Nome completo', value: this.selectedValue.name, col: 4, visible: true },
            { label: 'CPF', value: MaskHelpers.maskCpf(this.selectedValue.cpfCnpj), col: 2, visible: this.selectedValue.typePersonCode === 1 },
            { label: 'CNPJ', value: this.selectedValue.cpfCnpj, col: 2, visible: this.selectedValue.typePersonCode === 2 },
            { label: 'RG', value: this.selectedValue.rg, col: 2, visible: true },
            { label: 'Data de nascimento', value: this.selectedValue.birthDate, col: 2, visible: true },
            { label: 'Nome da mãe', value: this.selectedValue.motherName, col: 3, visible: true },
            { label: 'Endereço', value: this.selectedValue.publicPlace, col: 3, visible: true },
            { label: 'Número', value: this.selectedValue.number, col: 2, visible: true },
            { label: 'Bairro', value: this.selectedValue.neighborhood, col: 2, visible: true },
            { label: 'Cep', value: MaskHelpers.maskCep(this.selectedValue.postalCode), col: 2, visible: true },
            { label: 'Cidade', value: this.selectedValue.city, col: 2, visible: true },
            { label: 'UF', value: this.selectedValue.uf, col: 1, visible: true },
            { label: 'Email', value: this.selectedValue.email, col: 3, visible: true },
            { label: 'Telefone celular', value: MaskHelpers.maskTelephone(this.selectedValue.cellPhone), col: 2, visible: true },
            { label: 'Ativo', value: this.selectedValue.active ? 'SIM' : 'NÃO', col: 1, visible: true }
        ]
    }
}
