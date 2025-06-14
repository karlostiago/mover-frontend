import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../shared/service/AlertService";
import {TransactionService} from "../transaction.service";
import {CategoryEntity} from "../../../../../entity/CategoryEntity";
import {CategoryService} from "../../../configuration/category/category.service";
import {SubCategoryEntity} from "../../../../../entity/SubCategoryEntity";
import {SubCategoryService} from "../subcategory.service";
import {TransactionEntity} from "../../../../../entity/TransactionEntity";
import {InstallmentTypeEnum} from "../../../../../enum/InstallmentTypeEnum";
import {FrequencyTransactionEnum} from "../../../../../enum/FrequencyTransactionEnum";
import {SelectItemGroup} from "primeng/api";
import {LoaderService} from "../../../../core/loader/loader.service";
import {DateHelpers} from "../../../../../shared/DateHelpers";
import {GlobalDialogService, TypeDialog} from "../../../../../shared/service/GlobalDialogService";
import {AuthService} from "../../../../core/login/auth.service";
import {InvoiceService} from "../../invoice/invoice.service";
import {StringHelpers} from "../../../../../shared/StringHelpers";

@Component({
  selector: 'app-register-transaction',
  templateUrl: './register-transaction.component.html',
  styleUrls: ['./register-transaction.component.css']
})
export class RegisterTransactionComponent extends AbstractRegister implements OnInit, AfterViewInit {

    transaction = new TransactionEntity();
    categories = new Array<CategoryEntity>();
    subcategories = new Array<any>();

    typesEnum = new Array<any>();
    frequencyEnum = new Array<any>();
    installments= new Array<any>();
    invoices = new Array<any>();

    groupCategories: SelectItemGroup[];

    enableInstallments: boolean = false;
    isClone: boolean = false;
    visible: boolean;

    descriptionType: string;

    private readonly types = [
        { code: 1, name: 'RECEITA' },
        { code: 2, name: 'DESPESA' },
        { code: 3, name: 'INVESTIMENTO' },
        { code: 4, name: 'TRANSFERÊNCIA' }
    ]

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private transactionService: TransactionService,
                private categoryService: CategoryService,
                private subcategoryService: SubCategoryService,
                private globalDialogService: GlobalDialogService,
                protected authService: AuthService,
                private loadService: LoaderService,
                private invoiceService: InvoiceService,
                private cdr: ChangeDetectorRef) {
        super(activatedRoute);
        this.transaction.codeTypeCategory = Number(this.activatedRoute.snapshot.params['type']);
        if (this.activatedRoute.snapshot.url.at(-1)?.path === 'clone') {
            this.isClone = true;
        }
    }

    async ngOnInit() {
        this.transaction['registerDate'] = new Date();

        await Promise.all([
            this.loadingAllSubcategory(),
            this.loadingInstallmentType(),
            this.loadingFrequencyransaction()
        ]);

        if (!this.registerNew) {
            this.transactionService.findById(this.id).then(response => {
                localStorage.setItem("TRANSACTION_UPDATE", String(true));
                this.transaction = response;
                this.updateWhenClone();
                this.findCategories();
                if (this.transaction.cardId > 0) {
                    this.generatedSurroundingDueDate(DateHelpers.toDate(this.transaction.dueDate), 3, 3);
                    const selectedInvoice = this.invoices.find(invoice =>
                        invoice.value.getTime() === DateHelpers.toDate(this.transaction.dueDate!).getTime()
                    );
                    this.transaction.dueDate = selectedInvoice.value;
                }
            });
        }
    }

    async ngAfterViewInit() {
        const selectedType = this.types.find(t => t.code === this.transaction.codeTypeCategory)?.name;

        if (!selectedType) return;

        this.transaction.categoryType = selectedType;
        this.descriptionType = StringHelpers.capitalizeFirstLetter(selectedType);
        void this.findCategories();
        this.cdr.detectChanges();
    }

    saveOrUpdate(form: NgForm) {
        if (this.transaction.invoiceId) {
            this.updateInvoice();
        } else {
            if (this.transaction.id) {
                this.update();
            } else {
                void this.save(form);
            }
        }
    }

    loadingInstallments() {
        if (this.transaction.paymentType === 'IN_INSTALLMENTS') {
            this.transaction['installmentValue'] = 0;
            this.transaction['installment'] = 0;
            this.installments = Array.from({ length: 399 }, (_, i) => i + 2).map(number => ({
                label: number.toString(),
                value: number
            }));
        }
        else if (this.transaction.paymentType === 'FIXED') {
            this.transaction['installmentValue'] = this.transaction['value'];
        }
        else {
            this.installments = [];
            this.transaction['installment'] = 0;
            this.transaction['installmentValue'] = 0;
            this.transaction['frequency'] = "";
        }
    }

    override cancel(form: NgForm) {
        form.resetForm({
            paid: false,
            scheduled: false,
            dueDate: null
        });
        this.clear();
    }

    async findCategories() {
        this.loadService.automatic = false;
        const response = await this.categoryService.findAll();
        this.groupCategories = response.filter(category => category.type === this.transaction.categoryType).map(category => ({
            value: category.id,
            label: `${category.description}`,
            items: this.findSubcategories(category.id, this.subcategories)
        }));
        this.loadService.automatic = true;
    }

    processPayment() {
        this.transaction.paymentDate = null;
        if (this.transaction.paid) {
            this.transaction.paymentDate = DateHelpers.toUTC(new Date());
        }
    }

    formValid() {
        const validDate = this.validDate(this.transaction.dueDate);
        if (this.transaction.categoryType === 'TRANSFERÊNCIA') {
            return !!(this.transaction.subcategoryId && this.transaction.description &&
                this.transaction.accountId && this.transaction.destinationAccountId
                && this.transaction.value && validDate);
        }
        if (this.transaction.categoryType === 'CAPITAL SOCIETÁRIO') {
            return !!(this.transaction.subcategoryId && this.transaction.description &&
                this.transaction.accountId && this.transaction.partnerId
                && this.transaction.value && validDate);
        }
        return this.transaction.subcategoryId && this.transaction.description &&
            this.transaction.accountId && this.transaction.value && validDate;
    }

    calculatesInstallmentValue() {
        const hasValue = this.transaction.value && this.transaction.value > 0;
        const hasInstallment = this.transaction.installment && this.transaction.installment > 1;
        if (hasValue == 0) {
            this.transaction.installmentValue = 0;
        } else if (hasValue && hasInstallment) {
            this.transaction.installmentValue = this.transaction.value / this.transaction.installment;
        }
    }

    enableRepeat() {
        this.transaction.frequency = '';
        this.transaction.paymentType = '';
        this.transaction.installment = 0;
        this.transaction.installmentValue = 0;
        this.enableInstallments = !this.enableInstallments;
    }

    onCalculateCutOfDate() {
        if (this.transaction.cardId === 0 || this.transaction.cardId == null) {
            return;
        }

        this.loadService.automatic = false;
        this.transactionService.calculateCutOffDate(this.transaction).then(response => {
            this.transaction.dueDate = DateHelpers.toDate(response.dueDate);
            this.generatedSurroundingDueDate(this.transaction.dueDate!, 3, 3);
        }).finally(() => {
            this.loadService.automatic = true;
        });
    }

    private generatedSurroundingDueDate(dueDate: Date, monthBefore: number, monthAfter: number) {
        const invoices = new Array<Date>();
        for (let i = monthBefore; i >= 1; i--) {
            const date = new Date(dueDate);
            date.setMonth(date.getMonth() - i);
            invoices.push(date);
        }

        invoices.push(new Date(dueDate));

        for (let i = 1; i <= monthAfter; i++) {
            const date = new Date(dueDate);
            date.setMonth(date.getMonth() + i);
            invoices.push(date);
        }

        this.invoices = invoices.map(date => ({
            label: `${DateHelpers.formatLongDate(date, false)}`,
            value: date
        }));
    }

    private updateWhenClone() {
        if (this.isClone) {
            this.transaction.id = 0;
        }
    }

    private updateInvoice() {
        if (this.transaction.paymentType === 'FIXED' || this.transaction.paymentType === 'IN_INSTALLMENTS') {
            this.globalDialogService.openDialog(TypeDialog.BATCH_UPDATE_TRANSACTION, this.transaction);
        } else {
            this.invoiceService.update(this.transaction.id, this.transaction).then(() => {
                this.alertService.success("Registro atualizado com sucesso.");
            });
        }
    }

    private clear() {
        this.transaction.description = '';
        this.transaction.value = 0;
        this.transaction.paymentDate = null;
        this.transaction.accountId = 0;
        this.transaction.partnerId = 0;
        this.transaction.contractId = 0;
        this.transaction.destinationAccountId = 0;
        this.transaction.cardId = 0;
        this.transaction.vehicleId = 0;
        this.enableInstallments = false;
        this.transaction.dueDate = null;
        this.transaction.registerDate = new Date();
    }

    private findSubcategories(categoryId: number, subcategories: Array<SubCategoryEntity>) {
        return subcategories.filter(subcategory => subcategory.categoryId === categoryId)
            .map(subcategory => ({
                label: subcategory.description,
                value: subcategory.id
            }));
    }

    private async loadingAllSubcategory() {
        this.subcategoryService.findAll().then(response => {
            this.subcategories = [{ id: 0, description: 'Selecione' }, ...response];
        });
    }

    private async save(form: NgForm) {
        this.transactionService.save(this.transaction).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            this.cancel(form);
        });
    }

    private update() {
        if (this.transaction.paymentType === 'FIXED' || this.transaction.paymentType === 'IN_INSTALLMENTS') {
            this.globalDialogService.openDialog(TypeDialog.BATCH_UPDATE_TRANSACTION, this.transaction);
        } else {
            this.transactionService.update(this.transaction.id, this.transaction).then(() => {
                this.alertService.success("Registro atualizado com sucesso.");
            });
        }
    }

    private async loadingFrequencyransaction() {
        const frequencies = Object.entries(FrequencyTransactionEnum).map(([key, value]) => ({
            label: value,
            value: key
        }));
        this.frequencyEnum = [{ value: 0, label: 'Selecione' }, ...frequencies];
    }

    private async loadingInstallmentType() {
        const types = Object.entries(InstallmentTypeEnum).map(([key, value]) => ({
            label: value,
            value: key
        }));
        this.typesEnum = [{ value: 0, label: 'Selecione' }, ...types];
    }
}
