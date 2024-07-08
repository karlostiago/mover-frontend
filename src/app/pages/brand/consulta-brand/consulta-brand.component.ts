import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-consulta-brand',
  templateUrl: './consulta-brand.component.html',
  styleUrls: ['./consulta-brand.component.css']
})
export class ConsultaBrandComponent implements OnInit {

    brands: any = []

    constructor(private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.brands = [
            { id: 1, description: "Audi", active: true},
            { id: 2, description: "BMW", active: false},
            { id: 3, description: "Mercedes", active: true},
            { id: 4, description: "Golf", active: false}
        ]
    }

    confirmationDelete() {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir a marca ?`,
            accept: () => {
                this.delete();
            }
        })
    }

    delete() {
        console.log("excluido com sucesso");
    }
}
