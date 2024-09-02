import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../service/AlertService";
import {AccountEntity} from "../../../../entity/AccountEntity";
import {ClientService} from "../client.service";
import {FileUpload} from "primeng/fileupload";
import {ClientEntity} from "../../../../entity/ClientEntity";
import {TypePersonEntity} from "../../../../entity/TypePersonEntity";
import {BrazilianStatesEntity} from "../../../../entity/BrazilianStatesEntity";
import {LoaderService} from "../../../core/loader/loader.service";

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent extends AbstractRegister implements OnInit {

    client = new ClientEntity();
    types = new Array<TypePersonEntity>();
    brazilianStates = new Array<BrazilianStatesEntity>();

    account = new AccountEntity();

    @ViewChild("fileUpload") fileUpload: FileUpload | undefined;

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private loaderService: LoaderService,
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
        form.resetForm({
            active: true,
            typePerson: 1
        });
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
        for (const state of states) {
            this.brazilianStates.push(state);
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.client.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    private save(form: NgForm) {
        this.clientService.save(this.client).then(() => {
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
