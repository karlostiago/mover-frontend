import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../../shared/service/AlertService";
import {FineService} from "../fine.service";
import {AuthService} from "../../../../core/login/auth.service";
import {FineEntity} from "../../../../../entity/FineEntity";

@Component({
  selector: 'app-search-fine',
  templateUrl: './search-fine.component.html',
  styleUrls: ['./search-fine.component.css']
})
export class SearchFineComponent implements OnInit {
    fines = new Array<FineEntity>();

    searchFilter: string = "";

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                protected authService: AuthService,
                private fineService: FineService) {
    }

    async ngOnInit() {
        this.fineService.findAll().then(response => {
            this.fines = response;
        });
    }

    confirmationDelete(fine: FineEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir a multa de código ${fine['infractionCode']}?`,
            accept: () => {
                this.delete(fine.id);
            }
        })
    }

    delete(id: number) {
        this.fineService.delete(id).then(() => {
            this.fines = this.fines.filter(a => a.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.fineService.findBy(this.searchFilter).then(response => {
            this.fines = response;
        })
    }

    synchronize(id: number, fine: FineEntity) {
        this.fineService.synchronize(id).then(() => {
            fine.syncronizedTransaction = true;
            this.alertService.success("Registro sincronizado com sucesso.");
        })
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'Pendente':
                return 'text-bg-warning text-white';
            case 'Em atraso':
                return 'text-bg-danger';
            case 'Pago':
                return 'text-bg-success';
            default:
                return 'text-bg-secondary';
        }
    }
}
