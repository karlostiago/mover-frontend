import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../shared/service/AlertService";
import {ParameterService} from "../parameter.service";
import {TypeValueEntity} from "../../../../../entity/TypeValueEntity";
import {ParameterEntity} from "../../../../../entity/ParameterEntity";
import {AuthService} from "../../../../core/login/auth.service";

@Component({
  selector: 'app-register-parameter',
  templateUrl: './register-parameter.component.html',
  styleUrls: ['./register-parameter.component.css']
})
export class RegisterParameterComponent extends AbstractRegister implements OnInit {

    typesValue = new Array<TypeValueEntity>();
    parameter = new ParameterEntity();
    selectedType: number = 0;

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                protected authService: AuthService,
                private configurationService: ParameterService) {
        super(activatedRoute);
    }

    ngOnInit(): void {
        this.loadingTypes();

        if (!this.registerNew) {
            this.configurationService.findById(this.id).then(response => {
                this.parameter = response;
                this.selectedType = parseInt(this.parameter.typeValue);
            });
        }
    }

    saveOrUpdate(form: NgForm) {
        this.parameter.typeValue = this.typesValue.filter(t => t.code === this.selectedType)[0].description;
        if (this.parameter.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    replaceSpaceWithUnderscore(value: string) {
        if (!value || value.trim() === '') return '';

        const normalizedText = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return normalizedText.trim().replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9_ ]/g, '')
            .replace(/_+/g, '_');
    }

    isMandatoryKey() {
        const keys = ["DESVALORIZACAO_FIPE", "DESVALORIZACAO_FIPE_LEILAO"];
        if (this.parameter.key) {
            return keys.includes(this.parameter.key.toUpperCase());
        }
        return false;
    }

    clearValue() {
        this.parameter.value = '';
    }

    override cancel(form: NgForm) {
        form.resetForm({
            active: true,
            typeValue: 0,
        });
    }

    private save(form: NgForm) {
        this.configurationService.save(this.parameter).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            form.resetForm({
                active: true,
                typeValue: 0,
            });
        });
    }

    private update() {
        this.configurationService.update(this.parameter.id, this.parameter).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }

    private loadingTypes() {
        this.configurationService.findAllTypesValue().then(response => {
            this.typesValue = [{ code: 0, description: 'Selecione' }, ...response];
        });
    }
}
