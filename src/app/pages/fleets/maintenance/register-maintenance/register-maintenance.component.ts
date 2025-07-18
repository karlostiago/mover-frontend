import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../shared/service/AlertService";
import {MaintenanceService} from "../maintenance.service";
import {VehicleEntity} from "../../../../../entity/VehicleEntity";
import {VehicleService} from "../../vehicle/vehicle.service";
import {MaintenanceEntity} from "../../../../../entity/MaintenanceEntity";
import {AccountEntity} from "../../../../../entity/AccountEntity";
import {AccountService} from "../../../configuration/account/account.service";
import {CardEntity} from "../../../../../entity/CardEntity";
import {CardService} from "../../../configuration/card/card.service";
import {MaintenanceTypeEntity} from "../../../../../entity/MaintenanceTypeEntity";
import {AuthService} from "../../../../core/login/auth.service";
import {ItemMaintenanceEntity} from "../../../../../entity/ItemMaintenanceEntity";

@Component({
  selector: 'app-register-maintenance',
  templateUrl: './register-maintenance.component.html',
  styleUrls: ['./register-maintenance.component.css']
})
export class RegisterMaintenanceComponent extends AbstractRegister implements OnInit {

    maintenance = new MaintenanceEntity();
    accounts = new Array<AccountEntity>();
    cards = new Array<CardEntity>();
    vehicles = new Array<VehicleEntity>();
    types = new Array<MaintenanceTypeEntity>();

    items = new Array<ItemMaintenanceEntity>();
    services= new Array<ItemMaintenanceEntity>();
    invoices = new Array<any>()

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private accountService: AccountService,
                private cardService: CardService,
                private maintenanceService: MaintenanceService,
                protected authService: AuthService,
                private vehicleService: VehicleService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        await Promise.all([
            this.loadingAllAccounts(),
            this.loadingAllVehicles(),
            this.loadingAllTypes()
        ]);

        if (!this.registerNew) {
            this.maintenanceService.findById(this.id).then(response => {
                this.maintenance = response;
                this.onChanceCard();
            });
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.maintenance.id) {
            this.update();
        } else {
            void this.save(form);
        }
    }

    onChanceCard() {
        this.cardService.findAll().then(response => {
            const cards = response.filter(c => c.accountId === this.maintenance['accountId']);
            if (cards.length === 0) {
                this.maintenance['cardId'] = 0;
            }
            this.cards = [{ id: 0, name: 'Selecione' } as CardEntity, ...cards];
        });
    }

    onGenerateInvoices() {
        if (this.maintenance.cardId) {
            const index = this.cards.findIndex(c => c.id === this.maintenance.cardId);
            const card = this.cards[index];
            const today = new Date();
            const dueDate = new Date(today.getFullYear(), today.getMonth(), card.dueDate);
            this.invoices = this.generatedSurroundingDueDate(dueDate, 3, 3);
            this.maintenance.dueDate = dueDate;
            this.maintenance.totalInstallment = 1;
            this.calculateInstallmentValue();
        } else {
            this.maintenance.totalInstallment = 0;
            this.maintenance.dueDate = null!;
            this.maintenance.installmentValue = 0;
        }
    }

    updateValue() {
        const itemsValue = this.sumValues(this.items);
        const servicesValue = this.sumValues(this.services);
        this.maintenance.value = (itemsValue + servicesValue)  - this.maintenance.discount;
        this.calculateInstallmentValue();
    }

    override cancel(form: NgForm) {
        form.resetForm({
            date: new Date(),
            active: true
        });
        this.items = [];
        this.services = [];
        this.cards = [];
    }

    enable(form: NgForm) {
        const hasPermission = this.authService.hasPermission('REGISTER_MAINTENANCE') ||
            this.authService.hasPermission('UPDATE_MAINTENANCE');
        return !form.valid && hasPermission;
    }

    showWhenCardSelected(maintenance: MaintenanceEntity) {
        return maintenance.cardId;
    }

    notShowWhenCardSelected(maintenance: MaintenanceEntity) {
        return !this.showWhenCardSelected(maintenance)
    }

    calculateInstallmentValue() {
        if (this.maintenance.totalInstallment > 0) {
            this.maintenance.installmentValue = (this.maintenance.value / this.maintenance.totalInstallment);
        } else {
            this.maintenance.totalInstallment = 0;
            this.maintenance.installmentValue = 0;
        }
    }

    private sumValues(values: ItemMaintenanceEntity[]) {
        return values.reduce((sum, i) => sum + (i.value * i.quantity), 0);
    }

    private async save(form: NgForm) {
        this.maintenanceService.save(this.maintenance).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            this.cancel(form);
        })
    }

    private update() {
        this.maintenanceService.update(this.maintenance.id, this.maintenance).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }

    private async loadingAllVehicles() {
        this.vehicleService.findAll().then(response => {
            // @ts-ignore
            this.vehicles = [{ id: 0, fullname: 'Selecione' }, ...response];
        });
    }

    private async loadingAllAccounts() {
        this.accountService.findAll().then(response => {
            // @ts-ignore
            this.accounts = [{ id: 0, name: 'Selecione' }, ...response.filter(acc => acc.active)];
        });
    }

    private async loadingAllTypes() {
        this.maintenanceService.findAllTypes().then(response => {
            // @ts-ignore
            this.types = [{ description: 0, description: 'Selecione' }, ...response];
        });
    }
}
