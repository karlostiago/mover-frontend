import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../shared/service/AlertService";
import {ClientService} from "../client.service";
import {ClientEntity} from "../../../../../entity/ClientEntity";
import {TypePersonEntity} from "../../../../../entity/TypePersonEntity";
import {BrazilianStatesEntity} from "../../../../../entity/BrazilianStatesEntity";
import {LoaderService} from "../../../../core/loader/loader.service";
import {ContactEntity} from "../../../../../entity/ContactEntity";
import {GlobalDialogService, TypeDialog} from "../../../../../shared/service/GlobalDialogService";
import {AuthService} from "../../../../core/login/auth.service";
import {ErrorHandler} from "../../../../core/handler/ErrorHandler";

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent extends AbstractRegister implements OnInit {

    client = new ClientEntity();
    types = new Array<TypePersonEntity>();
    brazilianStates = new Array<BrazilianStatesEntity>();

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private loaderService: LoaderService,
                private globalDialogService: GlobalDialogService,
                protected authService: AuthService,
                private error: ErrorHandler,
                private clientService: ClientService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        await this.loadingTypesPerson();
        await this.loadingBrazilianStates();
        if (!this.registerNew) {
            this.clientService.findById(this.id).then(response => {
                this.client = response;
            });
        }
    }

    async onFindAddrees() {
        this.loaderService.automatic = false;
        if (this.client['postalCode']) {
            this.clientService.findAddress(this.client['postalCode']).then(response => {
                if (response) {
                    this.client.brazilianStateCode = response.brazilianStateCode;
                    this.client.city = response.city;
                    this.client.neighborhood = response.neighborhood;
                    this.client.publicPlace = response.publicPlace;
                } else {
                    this.client.city = "";
                    this.client.neighborhood = "";
                    this.client.publicPlace = "";
                    this.client.brazilianStateCode = null;
                }
            });
        }
        this.loaderService.automatic = true;
    }

    override cancel(form: NgForm) {
        this.client.contacts = new Array<ContactEntity>();
        form.resetForm({
            active: true,
            typePerson: 1
        });
    }

    saveOrUpdate(form: NgForm) {
        if (this.client.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    openDialogContact() {
        if (this.authService.hasPermission('REGISTER_ADDRESS_CLIENTS')) {
            this.globalDialogService.openDialog(TypeDialog.CONTACT, this.client);
        } else {
            this.error.capture({ status: 403 })
        }
    }

    deleteContact(contact: ContactEntity) {
        if (this.authService.hasPermission('DELETE_ADDRESS_CLIENTS')) {
            this.client.contacts = this.client.contacts.filter(c => c.id !== contact.id);
        } else {
            this.error.capture({ status: 403 })
        }
    }

    updateOpenDialogContact(contact: ContactEntity) {
        if (this.authService.hasPermission('UPDATE_ADDRESS_CLIENTS')) {
            this.globalDialogService.openDialog(TypeDialog.CONTACT, this.client, contact);
        } else {
            this.error.capture({ status: 403 })
        }
    }

    enable(form: NgForm) {
        const hasPermission = this.authService.hasPermission('REGISTER_CLIENTS') ||
            this.authService.hasPermission('UPDATE_CLIENTS');
        return !form.valid && hasPermission;
    }

    private async loadingTypesPerson() {
        const types = await this.clientService.findAllTypes();
        for (const type of types) {
            this.types.push(type);
        }
        this.client['typePersonCode'] = 1;
    }

    private async loadingBrazilianStates() {
        const states = await this.clientService.findAllBrazilianStates();
        this.brazilianStates.push({ code: 0, description: 'Selecione' });

        for (const state of states) {
            this.brazilianStates.push(state);
        }
    }

    private save(form: NgForm) {
        this.clientService.save(this.client).then(() => {
            this.client.contacts = new Array<ContactEntity>();
            this.alertService.success("Registro cadastrado com sucesso.");
            form.resetForm({
                active: true,
                typePerson: 1
            });
        });
    }

    private update() {
        this.clientService.update(this.client.id, this.client).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }
}
