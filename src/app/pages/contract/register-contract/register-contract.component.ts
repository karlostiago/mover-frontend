import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../service/AlertService";
import {ContractService} from "../contract.service";
import {ContractEntity} from "../../../../entity/ContractEntity";
import {VehicleEntity} from "../../../../entity/VehicleEntity";
import {ClientEntity} from "../../../../entity/ClientEntity";
import {VehicleService} from "../../vehicle/vehicle.service";
import {ClientService} from "../../client/client.service";
import {DayOfWeekEntity} from "../../../../entity/DayOfWeekEntity";
import {SituationEntity} from "../../../../entity/SituationEntity";
import {PaymentFrequencyEntity} from "../../../../entity/PaymentFrequencyEntity";

@Component({
  selector: 'app-register-contract',
  templateUrl: './register-contract.component.html',
  styleUrls: ['./register-contract.component.css']
})
export class RegisterContractComponent extends AbstractRegister implements OnInit {

    contract = new ContractEntity()
    vehicles = new Array<VehicleEntity>();
    clients = new Array<ClientEntity>();
    daysOfWeek = new Array<DayOfWeekEntity>();
    situations = new Array<SituationEntity>();
    paymentFrenquencies = new Array<PaymentFrequencyEntity>();

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private contractService: ContractService,
                private vehicleService: VehicleService,
                private clientService: ClientService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        await this.loadingOnlyActiveClients();
        await this.loadingAvailableVehicles();

        await this.loadingSituations();
        await this.loadingPaymentFrequencies();
        await this.loadingDaysOfWeek();

        if (!this.registerNew) {
            this.contractService.findById(this.id).then(response => {
                this.contract = response;
            });
        } else {
            this.generatedNewContract();
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.contract.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    override cancel(form: NgForm) {
        form.resetForm({
            initialDate: this.contract.initialDate,
            situation: this.contract.situation,
            paymentFrequency: this.contract.paymentFrequency,
            active: true
        });
    }

    private generatedNewContract() {
        this.contractService.generatedNewContractWithSequence().then(response => {
            this.contract = response;
        });
    }

    private save(form: NgForm) {
        this.contractService.save(this.contract).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            this.generatedNewContract();
            form.resetForm({
                initialDate: this.contract.initialDate,
                situation: this.contract.situation,
                paymentFrequency: this.contract.paymentFrequency,
                active: true
            });
        });
    }

    private update() {
        this.contractService.update(this.contract.id, this.contract).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }

    private async loadingPaymentFrequencies() {
        this.contractService.findAllPaymentFrequencies().then(response => {
            this.paymentFrenquencies = response;
        });
    }

    private async loadingDaysOfWeek() {
        this.contractService.findAllDaysOfWeek().then(response => {
            this.daysOfWeek = response;
        });
    }

    private async loadingSituations() {
        this.contractService.findAllSituations().then(response => {
            this.situations = response;
        });
    }

    private async loadingAvailableVehicles() {
        this.vehicleService.findAll().then(response => {
            this.vehicles = response.filter( v => v.situation === 'DISPONÍVEL');
        });
    }

    private async loadingOnlyActiveClients() {
        this.clientService.findAll().then(response => {
            this.clients = response.filter(r => r.active);
        });
    }
}
