import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../service/AlertService";
import {MaintenanceService} from "../maintenance.service";
import {VehicleEntity} from "../../../../entity/VehicleEntity";
import {VehicleService} from "../../vehicle/vehicle.service";
import {MaintenanceEntity} from "../../../../entity/MaintenanceEntity";
import {AccountEntity} from "../../../../entity/AccountEntity";
import {AccountService} from "../../account/account.service";
import {CardEntity} from "../../../../entity/CardEntity";
import {CardService} from "../../card/card.service";
import {MaintenanceTypeEntity} from "../../../../entity/MaintenanceTypeEntity";

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

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private accountService: AccountService,
                private cardService: CardService,
                private maintenanceService: MaintenanceService,
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
            this.save(form);
        }
    }

    onChanceCard() {
        this.cardService.findAll().then(response => {
            const cards = response.filter(c => c.accountId === this.maintenance['accountId']);
            // @ts-ignore
            this.cards = [{ id: 0, name: 'Selecione' }, ...cards];
        });
    }

    override cancel(form: NgForm) {
        form.resetForm({
            date: new Date(),
            active: true
        });
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
            this.accounts = [{ id: 0, name: 'Selecione' }, ...response];
        });
    }

    private async loadingAllTypes() {
        this.maintenanceService.findAllTypes().then(response => {
            // @ts-ignore
            this.types = [{ description: 0, description: 'Selecione' }, ...response];
        });
    }
}
