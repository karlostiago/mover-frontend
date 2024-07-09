import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {Symbol} from "../../../enum/Symbol";

@Component({
  selector: 'app-search-brand',
  templateUrl: './search-brand.component.html',
  styleUrls: ['./search-brand.component.css']
})
export class SearchBrandComponent implements OnInit {

    brands: any = []

    constructor(private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.brands = [
            { id: 1, description: "Audi", symble: Symbol.AUDI, active: true},
            { id: 2, description: "BMW", symble: Symbol.BMW, active: false},
            { id: 3, description: "Mercedes", symble: Symbol.MERCEDES, active: true},
            { id: 4, description: "Golf", symble: Symbol.VOLKSWAGEN, active: false}
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
