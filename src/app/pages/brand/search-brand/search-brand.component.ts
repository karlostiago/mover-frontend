import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {SymbolBrandBase64} from "../../../enum/SymbolBrandBase64";

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
            { id: 1, description: "Audi", symble: SymbolBrandBase64.AUDI, active: true},
            { id: 2, description: "BMW", symble: SymbolBrandBase64.BMW, active: false},
            { id: 3, description: "Mercedes", symble: SymbolBrandBase64.MERCEDES, active: true},
            { id: 4, description: "Golf", symble: SymbolBrandBase64.VOLKSWAGEN, active: false}
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
