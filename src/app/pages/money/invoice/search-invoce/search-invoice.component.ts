import {Component, OnInit} from '@angular/core';
import {AbstractSearch} from "../../../../../abstract/AbstractSearch";
import {TransactionEntity} from "../../../../../entity/TransactionEntity";
import {AuthService} from "../../../../core/login/auth.service";
import {ActivatedRoute} from "@angular/router";
import {NumberHelpers} from "../../../../../shared/NumberHelpers";
import {InvoiceService} from "../invoice.service";
import {transition} from "@angular/animations";

@Component({
  selector: 'app-invoice-brand',
  templateUrl: './search-invoice.component.html',
  styleUrls: ['./search-invoice.component.css']
})
export class SearchInvoiceComponent extends AbstractSearch implements OnInit {

    private id: number;
    invoice = new TransactionEntity();
    transactions = new Array<TransactionEntity>();

    constructor(protected authService: AuthService,
                private invoiceService: InvoiceService,
                protected activatedRoute: ActivatedRoute) {
        super();
        if (this.activatedRoute.snapshot.params['id']) {
            this.id = this.activatedRoute.snapshot.params['id'];
        }
    }

    async ngOnInit() {
        this.invoiceService.searchInvoice(this.id).then(response => {
            this.transactions = response.filter(t => !t.invoice);
            this.invoice = response.find(t => t.invoice)!;
            localStorage.setItem("TRANSACTION_UPDATE", String(true));
        });
    }

    addLocalstorage() {
        localStorage.setItem("VALUE_ID", this.selectedValue.id);
    }

    createFieldsSidebarDetails() {
        const card = this.selectedValue.cardId > 0 ? `/ ${this.selectedValue.card}` : '';
        this.fields = [
            { label: 'Tipo de lançamento', value: this.selectedValue.categoryType, col: 3, visible: true },
            { label: 'Categoria', value: this.selectedValue.subcategory, col: 2, visible: true },
            { label: 'Descrição', value: this.selectedValue.description, col: 7, visible: true },
            { label: 'Veículo', value: this.selectedValue.vehicle, col: 3, visible: true },
            { label: 'Contrato', value: this.selectedValue.contract, col: 2, visible: true },
            { label: 'Conta / Cartão', value: `${this.selectedValue.account} ${card}`, col: 3, visible: true },
            { label: 'Valor', value: NumberHelpers.currencyBRL(this.selectedValue.value, true), col: 2, visible: true },
            { label: 'Agendado', value: this.selectedValue.scheduled ? 'SIM' : 'NÃO', col: 2, visible: true },
            { label: 'Data vencimento', value: this.selectedValue.dueDate, col: 3, visible: true },
            { label: 'Data pagamento', value: this.selectedValue.paymentDate, col: 2, visible: this.selectedValue.paid },
            { label: 'Efetivado / Pago', value: this.selectedValue.paid ? 'SIM' : 'NÃO', col: 2, visible: true }
        ]
    }

    protected readonly NumberHelpers = NumberHelpers;
    protected readonly transition = transition;
}
