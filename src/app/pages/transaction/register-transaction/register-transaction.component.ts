import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../service/AlertService";
import {TransactionService} from "../transaction.service";
import {CategoryEntity} from "../../../../entity/CategoryEntity";
import {CategoryService} from "../../category/category.service";
import {SubCategoryEntity} from "../../../../entity/SubCategoryEntity";
import {SubCategoryService} from "../subcategory.service";
import {TransactionEntity} from "../../../../entity/TransactionEntity";
import {InstallmentTypeEnum} from "../../../../enum/InstallmentTypeEnum";
import {FrequencyTransactionEnum} from "../../../../enum/FrequencyTransactionEnum";
import {SelectItemGroup} from "primeng/api";
import {CategoryTypeEntity} from "../../../../entity/CategoryTypeEntity";
import {LoaderService} from "../../../core/loader/loader.service";
import {DateHelpers} from "../../../../shared/DateHelpers";
import {GlobalDialogService, TypeDialog} from "../../../../shared/service/GlobalDialogService";

@Component({
  selector: 'app-register-transaction',
  templateUrl: './register-transaction.component.html',
  styleUrls: ['./register-transaction.component.css']
})
export class RegisterTransactionComponent extends AbstractRegister implements OnInit {

    transaction = new TransactionEntity();
    categories = new Array<CategoryEntity>();
    subcategories = new Array<SubCategoryEntity>();
    categoryTypes = new Array<CategoryTypeEntity>();

    typesEnum = new Array<any>();
    frequencyEnum = new Array<any>();
    installments= new Array<any>();

    groupCategories: SelectItemGroup[];

    enableInstallments: boolean = false;

    edit: boolean;
    visible: boolean;

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private transactionService: TransactionService,
                private categoryService: CategoryService,
                private subcategoryService: SubCategoryService,
                private globalDialogService: GlobalDialogService,
                private loadService: LoaderService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        await this.loadingAllSubcategory();
        await this.loadingInstallmentType();
        await this.loadingFrequencyransaction();
        await this.loadingTransactionTypes();

        if (!this.registerNew) {
            this.edit = true;
            this.transactionService.findById(this.id).then(response => {
                localStorage.setItem("TRANSACTION_UPDATE", String(true));
                this.transaction = response;
                this.findCategories();
            });
        } else {
            this.edit = false;
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.transaction.id) {
            this.update();
        } else {
            this.save(form);
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
        });
        this.transaction.value = 0;
        this.transaction.paymentDate = null;
        this.transaction.accountId = 0;
        this.transaction.partnerId = 0;
        this.transaction.contractId = 0;
        this.transaction.cardId = 0;
        this.transaction.vehicleId = 0;
        this.enableInstallments = false;
        this.transaction.dueDate = null;
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

    private resetInstallment() {
        this.transaction.frequency = '';
        this.transaction.paymentType = '';
        this.transaction.installment = 0;
        this.transaction.installmentValue = 0;
    }

    private findSubcategories(categoryId: number, subcategories: Array<SubCategoryEntity>) {
        return this.subcategories.filter(subcategory => subcategory.categoryId === categoryId)
            .map(subcategory => ({
                label: subcategory.description,
                value: subcategory.id
            }));
    }

    private async loadingAllSubcategory() {
        this.subcategoryService.findAll().then(response => {
            // @ts-ignore
            this.subcategories = [{ id: 0, description: 'Selecione' }, ...response];
        });
    }

    private async save(form: NgForm) {
        this.transactionService.save(this.transaction).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            this.transaction = new TransactionEntity();
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

    private async loadingTransactionTypes() {
        this.categoryService.findAllTypes().then(response => {
            this.categoryTypes = [{ code: 0, description: 'Selecione' }, ...response];
        });
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
