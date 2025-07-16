import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../shared/service/AlertService";
import {FineService} from "../fine.service";
import {AuthService} from "../../../../core/login/auth.service";
import {FineEntity} from "../../../../../entity/FineEntity";
import {VehicleService} from "../../../fleets/vehicle/vehicle.service";
import {VehicleEntity} from "../../../../../entity/VehicleEntity";
import {ClientEntity} from "../../../../../entity/ClientEntity";
import {ClientService} from "../../../clients/client/client.service";
import {AccountEntity} from "../../../../../entity/AccountEntity";
import {AccountService} from "../../../configuration/account/account.service";
import {CardEntity} from "../../../../../entity/CardEntity";
import {CardService} from "../../../configuration/card/card.service";

@Component({
  selector: 'app-register-fine',
  templateUrl: './register-fine.component.html',
  styleUrls: ['./register-fine.component.css']
})
export class RegisterFineComponent extends AbstractRegister implements OnInit {

    fine = new FineEntity();
    vehicles = new Array<VehicleEntity>();
    clients = new Array<ClientEntity>();
    accounts = new Array<AccountEntity>();
    cards = new Array<CardEntity>();
    selectedCards  = new Array<CardEntity>();

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                protected authService: AuthService,
                private vehicleService: VehicleService,
                private clientService: ClientService,
                private accountService: AccountService,
                private cardService: CardService,
                private fineService: FineService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        await this.loadingVehicles();
        await this.loadingClients();
        await this.loadingAccounts();
        await this.loadingCards();

        if (!this.registerNew) {
            this.fineService.findById(this.id).then(response => {
                this.fine = response;
            });
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.fine.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    filterCardsByAccount() {
        this.cards = this.selectedCards
            .filter(s => s.accountId === this.fine.accountId);
    }

    override cancel(form: NgForm) {
        form.resetForm({
            realOffender: false,
        });
        this.cards = [];
    }

    private save(form: NgForm) {
        this.fineService.save(this.fine).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            this.cancel(form);
        });
    }

    private update() {
        this.fineService.update(this.fine.id, this.fine).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }

    private async loadingVehicles() {
        const response = await this.vehicleService.findAll();
        this.vehicles =  [...response.filter(r => r.active)];
    }

    private async loadingClients() {
        const response = await this.clientService.findAll();
        this.clients =  [...response.filter(s => s.active)];
    }

    private async loadingAccounts() {
        const response = await this.accountService.findAll();
        this.accounts =  [...response.filter(s => s.active)];
    }

    private async loadingCards() {
        const response = await this.cardService.findAll();
        this.selectedCards =  [...response.filter(s => s.active)];
    }
}
