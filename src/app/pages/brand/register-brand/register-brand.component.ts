import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AbstractRegister} from "../../../core/AbstractRegister";
import {Symbol} from "../../../enum/Symbol";

@Component({
  selector: 'app-register-brand',
  templateUrl: './register-brand.component.html',
  styleUrls: ['./register-brand.component.css']
})
export class RegisterBrandComponent extends AbstractRegister implements OnInit {

    symbols = new Array<string>();

    selectedSymbol: string = "";

    constructor(protected override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    ngOnInit(): void {
        this.loadSymbols();
    }

    private loadSymbols() {
        for (const key in Symbol) {
            // @ts-ignore
            this.symbols.push(Symbol[`${key}`]);
        }
    }
}
