import {Component, Input, OnInit} from '@angular/core';
import {NumberHelpers} from "../../../../../shared/NumberHelpers";
import {TransactionEntity} from "../../../../../entity/TransactionEntity";

@Component({
    selector: 'app-invoice-card',
    templateUrl: './invoice-card.component.html',
    styleUrls: ['./invoice-card.component.css']
})
export class InvoiceCardComponent implements OnInit {

    @Input() invoice = new TransactionEntity();

    constructor() {

    }

    async ngOnInit() {

    }

    protected readonly NumberHelpers = NumberHelpers;
}
