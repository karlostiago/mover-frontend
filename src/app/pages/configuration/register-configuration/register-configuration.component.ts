import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../service/AlertService";
import {ConfigurationService} from "../configuration.service";
import {ModelEntity} from "../../../../entity/ModelEntity";
import {BrandService} from "../../brand/brand.service";
import {BrandEntity} from "../../../../entity/BrandEntity";
import {TypeValueEntity} from "../../../../entity/TypeValueEntity";
import {ConfigurationEntity} from "../../../../entity/ConfigurationEntity";

@Component({
  selector: 'app-register-configuration',
  templateUrl: './register-configuration.component.html',
  styleUrls: ['./register-configuration.component.css']
})
export class RegisterConfigurationComponent extends AbstractRegister implements OnInit {

    typesValue = new Array<TypeValueEntity>();
    configuration = new ConfigurationEntity();

    selectedType: number = 0;

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private brandService: BrandService,
                private configurationService: ConfigurationService,
                private modelService: ConfigurationService) {
        super(activatedRoute);
    }

    ngOnInit(): void {
        this.loadingTypes();

        if (!this.registerNew) {
            this.modelService.findById(this.id).then(response => {

            });
        }
    }

    saveOrUpdate(form: NgForm) {
        this.configuration.typeValue = this.typesValue.filter(t => t.code === this.selectedType)[0].description;
        console.log(this.configuration);

        if (this.configuration.id) {
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

    override cancel(form: NgForm) {
        form.resetForm({
            active: true,
            typeValue: 0,
        });
    }

    private save(form: NgForm) {
        this.configurationService.save(this.configuration).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            form.resetForm({
                active: true,
                typeValue: 0,
            });
        });
    }

    private update() {
        // this.modelService.update(this.model.id, this.model).then(() => {
        //     this.alertService.success("Registro atualizado com sucesso.");
        // });
    }

    private loadingTypes() {
        this.configurationService.findAllTypesValue().then(response => {
            this.typesValue = response;
        });
    }
}
