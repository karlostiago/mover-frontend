import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../service/AlertService";
import {ProfileService} from "../profile.service";
import {PartnerEntity} from "../../../../../entity/PartnerEntity";

@Component({
  selector: 'app-register-profile',
  templateUrl: './register-profile.component.html',
  styleUrls: ['./register-profile.component.css']
})
export class RegisterProfileComponent extends AbstractRegister implements OnInit {

    partner = new PartnerEntity();

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private profileService: ProfileService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        if (!this.registerNew) {
            this.profileService.findById(this.id).then(response => {
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
        this.profileService.save(this.partner).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            form.resetForm({
                active: true
            });
        });
    }

    private update() {
        this.profileService.update(this.partner.id, this.partner).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }
}
