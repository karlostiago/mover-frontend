import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../service/AlertService";
import {TransactionService} from "../transaction.service";
import {VehicleEntity} from "../../../../entity/VehicleEntity";
import {VehicleService} from "../../vehicle/vehicle.service";
import {AccountEntity} from "../../../../entity/AccountEntity";
import {AccountService} from "../../account/account.service";
import {CardEntity} from "../../../../entity/CardEntity";
import {CardService} from "../../card/card.service";
import {ContractService} from "../../contract/contract.service";
import {ContractEntity} from "../../../../entity/ContractEntity";
import {CategoryEntity} from "../../../../entity/CategoryEntity";
import {CategoryService} from "../../category/category.service";
import {SubCategoryEntity} from "../../../../entity/SubCategoryEntity";
import {SubCategoryService} from "../../subcategory/subcategory.service";
import {TransactionEntity} from "../../../../entity/TransactionEntity";
import {TypeTransactionEnum} from "../../../../enum/TypeTransactionEnum";
import {PeriodTransactionEnum} from "../../../../enum/PeriodTransactionEnum";
import {SelectItemGroup} from "primeng/api";
import {CategoryTypeEntity} from "../../../../entity/CategoryTypeEntity";

@Component({
  selector: 'app-register-transaction',
  templateUrl: './register-transaction.component.html',
  styleUrls: ['./register-transaction.component.css']
})
export class RegisterTransactionComponent extends AbstractRegister implements OnInit {

    transaction = new TransactionEntity();
    accounts = new Array<AccountEntity>();
    cards = new Array<CardEntity>();
    vehicles = new Array<VehicleEntity>();
    contracts = new Array<ContractEntity>();
    categories = new Array<CategoryEntity>();
    subcategories = new Array<SubCategoryEntity>();
    transactionTypes = new Array<CategoryTypeEntity>();

    typesEnum = new Array<any>();
    periodEnum = new Array<any>();
    installments= new Array<any>();

    groupCategories: SelectItemGroup[];

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private accountService: AccountService,
                private cardService: CardService,
                private transactionService: TransactionService,
                private vehicleService: VehicleService,
                private contractService: ContractService,
                private categoryService: CategoryService,
                private subcategoryService: SubCategoryService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        await this.loadingAllSubcategory();
        await this.loadingAllAccounts();
        await this.loadingAllVehicles();
        await this.loadingAllContracts();
        await this.loadingTypeTransaction();
        await this.loadingPeriodTransaction();
        await this.loadingTransactionTypes();

        this.transaction.dueDate = new Date();

        if (!this.registerNew) {
            this.transactionService.findById(this.id).then(response => {
                this.transaction = response;
            });
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.transaction.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    onChanceCard() {
        this.cardService.findAll().then(response => {
            this.cards = response.filter(c => c.accountId === this.transaction['accountId']);
        });
    }

    loadingInstallments() {
        if (this.transaction.paymentType === 'IN_INSTALLMENTS') {
            this.installments = Array.from({ length: 399 }, (_, i) => i + 2).map(number => ({
                label: number.toString(),
                value: number
            }));
        } else {
            this.installments = [];
            this.transaction['installments'] = 0;
        }
    }

    override cancel(form: NgForm) {
        form.resetForm({
            date: new Date(),
            active: true
        });
    }

    async findCategories() {
        const response = await this.categoryService.findAll();
        this.groupCategories = response.filter(category => category.type === this.transaction.transactionType).map(category => ({
            value: category.id,
            label: `${category.description}`,
            items: this.findSubcategories(category.id, this.subcategories)
        }));
    }

    processPayment() {
        this.transaction.paymentDate = this.transaction.paid ? new Date() : null;
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
            this.subcategories = response;
        });
    }

    private async save(form: NgForm) {
        this.transactionService.save(this.transaction).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            this.cancel(form);
        })
    }

    private update() {
        this.transactionService.update(this.transaction.id, this.transaction).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }

    private async loadingTransactionTypes() {
        this.categoryService.findAllTypes().then(response => {
            this.transactionTypes = response;
        });
    }

    private async loadingPeriodTransaction() {
        this.periodEnum = Object.entries(PeriodTransactionEnum).map(([key, value]) => ({
            label: value,
            value: key
        }));
    }

    private async loadingTypeTransaction() {
        this.typesEnum = Object.entries(TypeTransactionEnum).map(([key, value]) => ({
            label: value,
            value: key
        }));
    }

    private async loadingAllContracts() {
        this.contractService.findAll().then(response => {
            this.contracts = response;
        });
    }

    private async loadingAllVehicles() {
        this.vehicleService.findAll().then(response => {
            this.vehicles = response;
        });
    }

    private async loadingAllAccounts() {
        this.accountService.findAll().then(response => {
            this.accounts = response;
        });
    }
}
