import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../service/AlertService";
import {ContractService} from "../contract.service";
import {ContractEntity} from "../../../../../entity/ContractEntity";
import {VehicleEntity} from "../../../../../entity/VehicleEntity";
import {ClientEntity} from "../../../../../entity/ClientEntity";
import {VehicleService} from "../../../fleets/vehicle/vehicle.service";
import {ClientService} from "../../client/client.service";
import {DayOfWeekEntity} from "../../../../../entity/DayOfWeekEntity";
import {SituationEntity} from "../../../../../entity/SituationEntity";
import {PaymentFrequencyEntity} from "../../../../../entity/PaymentFrequencyEntity";
import {AuthService} from "../../../../core/login/auth.service";

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
                protected authService: AuthService,
                private clientService: ClientService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        await this.loadingSituations();
        await this.loadingPaymentFrequencies();
        await this.loadingDaysOfWeek();

        if (!this.registerNew) {
            await this.loadingAllClients();
            await this.loadingAllVehicles();
            this.contractService.findById(this.id).then(response => {
                this.contract = response;
            });
        } else {
            this.generatedNewContract();
            await this.loadingOnlyActiveClients();
            await this.loadingAvailableVehicles();
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.contract.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    enable(form: NgForm) {
        const hasPermission = this.authService.hasPermission('REGISTER_CONTRACTS') ||
            this.authService.hasPermission('UPDATE_CONTRACTS');
        return !form.valid && hasPermission;
    }

    override cancel(form: NgForm) {
        this.generatedNewContract();
        form.resetForm({
            number: this.contract.number,
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

    private async save(form: NgForm) {
        this.contractService.save(this.contract).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            this.loadingOnlyActiveClients();
            this.loadingAvailableVehicles();
            this.generatedNewContract();
            this.cancel(form);
        });
    }

    private update() {
        this.contractService.update(this.contract.id, this.contract).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }

    private async loadingPaymentFrequencies() {
        this.contractService.findAllPaymentFrequencies().then(response => {
            // @ts-ignore
            this.paymentFrenquencies = [{ code: 0, description: 'Selecione' }, ...response];
        });
    }

    private async loadingDaysOfWeek() {
        this.contractService.findAllDaysOfWeek().then(response => {
            // @ts-ignore
            this.daysOfWeek = [{ code: 0, description: 'Selecione' }, ...response];
        });
    }

    private async loadingSituations() {
        this.contractService.findAllSituations().then(response => {
            // @ts-ignore
            this.situations = [{ code: 0, description: 'Selecione' }, ...response];
        });
    }

    private async loadingAllVehicles() {
        this.vehicleService.findAll().then(response => {
            // @ts-ignore
            this.vehicles = [{ id: 0, fullname: 'Selecione' }, ...response];
        });
    }

    private async loadingAllClients() {
        this.clientService.findAll().then(response => {
            // @ts-ignore
            this.clients = [{ id: 0, name: 'Selecione' }, ...response];
        });
    }

    private async loadingAvailableVehicles() {
        this.vehicleService.onlyAvailable().then(response => {
            // @ts-ignore
            this.vehicles = [{ id: 0, fullname: 'Selecione' }, ...response.filter( v => v.active)];
        });
    }

    private async loadingOnlyActiveClients() {
        this.clientService.onlyAvailable().then(response => {
            // @ts-ignore
            this.clients = [{ id: 0, name: 'Selecione' }, ...response.filter(r => r.active)];
        });
    }
}
