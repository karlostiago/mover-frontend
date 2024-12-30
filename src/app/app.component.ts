import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GlobalDialogService} from "../shared/service/GlobalDialogService";
import {GlobalDialogComponent} from "../shared/dialog/global-dialog.component";
import {PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'mover';

    @ViewChild(GlobalDialogComponent) globalDialog: GlobalDialogComponent;

    constructor(private config: PrimeNGConfig,
        private globalDialogService: GlobalDialogService) { }

    ngAfterViewInit(): void {
        this.globalDialogService.register(this.globalDialog);
    }

    ngOnInit(): void {
        this.config.setTranslation({
            firstDayOfWeek: 1,
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            today: 'hoje',
            clear: 'Excluir'
        });
    }
}
