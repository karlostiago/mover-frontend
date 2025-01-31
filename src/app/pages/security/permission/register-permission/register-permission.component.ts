import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../service/AlertService";
import {PermissionService} from "../permission.service";
import {PartnerEntity} from "../../../../../entity/PartnerEntity";

@Component({
  selector: 'app-register-permission',
  templateUrl: './register-permission.component.html',
  styleUrls: ['./register-permission.component.css']
})
export class RegisterPermissionComponent extends AbstractRegister implements OnInit {

    partner = new PartnerEntity();

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private partnerService: PermissionService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        if (!this.registerNew) {
            this.partnerService.findById(this.id).then(response => {
                this.partner = response;
            });
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.partner.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    private save(form: NgForm) {
        this.partnerService.save(this.partner).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            form.resetForm({
                active: true
            });
        });
    }

    private update() {
        this.partnerService.update(this.partner.id, this.partner).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }
}
