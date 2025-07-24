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
    invoices = new Array<any>()

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

        this.fineService.findAll().then(response => {
            console.log(response);
        })

        this.fine = {
            infractionCode: 7455,
            value: 104.13,
            discount: 26.03,
            originalValue: 130.16,
            description: 'TRANSITAR EM VELOCIDADE SUPERIOR A MAXIMA PERMITIDA EM ATE 20%',
            realOffender: false,
            expirationInfraction: new Date(),
            dueDate: new Date(),
            dateTimeOfCommitment: new Date(),
            clientId: 69,
            vehicleId: 2,
            accountId: 4,
            numberRenainf: 10451144201,
            infractionNotice: 'F600133735',
        } as FineEntity;

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
        const filteredCards = this.selectedCards
            .filter(s => s.accountId === this.fine.accountId);
        if (filteredCards.length > 0) {
            this.cards = [{ id: 0, name: 'Selecione' } as CardEntity, ...filteredCards];
        } else {
            this.invoices = [];
            this.fine.cardId = 0;
            this.fine.dueDate = null!;
            this.cards = [];
        }
    }

    calculateAmountPaid() {
        const value = this.fine.originalValue - this.fine.discount;
        if (value > 0) {
            this.fine.value = value;
        } else {
            this.fine.value = 0;
        }
    }

    showWhenCardSelected(fine: FineEntity) {
        return fine.cardId;
    }

    notShowWhenCardSelected(fine: FineEntity) {
        return !this.showWhenCardSelected(fine)
    }

    onGenerateInvoices() {
        if (this.fine.cardId) {
            const index = this.cards.findIndex(c => c.id === this.fine.cardId);
            const card = this.cards[index];
            const today = new Date();
            const dueDate = new Date(today.getFullYear(), today.getMonth(), card.dueDate);
            this.invoices = this.generatedSurroundingDueDate(dueDate, 3, 3);
            this.fine.dueDate = dueDate;
        } else {
            this.fine.dueDate = null!;
            this.invoices = [];
        }
    }

    override cancel(form: NgForm) {
        form.resetForm({
            realOffender: false,
        });
        this.cards = [];
    }

    private save(form: NgForm) {
        this.fineService.save(this.clone(this.fine)).then(() => {
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
        this.vehicles =  [{ id: 0, fullname: 'Selecione' } as VehicleEntity, ...response.filter(r => r.active)];
    }

    private async loadingClients() {
        const response = await this.clientService.findAll();
        this.clients =  [{ id: 0, name: 'Selecione' } as ClientEntity, ...response.filter(s => s.active)];
    }

    private async loadingAccounts() {
        const response = await this.accountService.findAll();
        this.accounts =  [{ id: 0, name: 'Selecione' } as AccountEntity, ...response.filter(s => s.active)];
    }

    private async loadingCards() {
        const response = await this.cardService.findAll();
        this.selectedCards =  [...response.filter(s => s.active)];
    }
}
