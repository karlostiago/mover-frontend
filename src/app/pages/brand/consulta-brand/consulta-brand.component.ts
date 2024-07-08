import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-consulta-brand',
  templateUrl: './consulta-brand.component.html',
  styleUrls: ['./consulta-brand.component.css']
})
export class ConsultaBrandComponent implements OnInit {

    brands: any = []

    ngOnInit(): void {
        this.brands = [
            { id: 1, description: "Audi", active: true},
            { id: 2, description: "BMW", active: false},
            { id: 3, description: "Mercedes", active: true},
            { id: 4, description: "Golf", active: false}
        ]
    }
}
