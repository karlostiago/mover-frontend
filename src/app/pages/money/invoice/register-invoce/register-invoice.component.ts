import {Component, OnInit} from '@angular/core';
import {AbstractRegister} from "../../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-register-invoice',
    templateUrl: './register-invoice.component.html',
    styleUrls: ['./register-invoice.component.css']
})
export class RegisterInvoiceComponent extends AbstractRegister implements OnInit {

    constructor(protected override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    async ngOnInit() {

    }
}
