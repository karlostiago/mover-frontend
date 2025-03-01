import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../shared/service/AlertService";
import {ProfileService} from "../profile.service";
import {ProfileEntity} from "../../../../../entity/ProfileEntity";
import {FunctionalityEntity} from "../../../../../entity/FunctionalityEntity";
import {AuthService} from "../../../../core/login/auth.service";

@Component({
  selector: 'app-register-profile',
  templateUrl: './register-profile.component.html',
  styleUrls: ['./register-profile.component.css']
})
export class RegisterProfileComponent extends AbstractRegister implements OnInit {

    profile = new ProfileEntity();
    clear: boolean = false;

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                protected authService: AuthService,
                private profileService: ProfileService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        if (!this.registerNew) {
            this.profileService.findById(this.id).then(response => {
                this.profile = response;
            });
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.profile.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    features(e: Array<FunctionalityEntity>) {
        this.profile.permissions = e;
    }

    info() {
        if (this.profile['description'] && this.profile['description'].length === 1) {
            this.alertService.info("A descrição deve ter mais que 5 caracteres.");
        }
    }

    enablePickPermissions() {
        return !!(this.profile['description'] && this.profile['description'].length > 5);
    }

    override cancel(form: NgForm) {
        super.cancel(form);
        this.clear = !this.clear;
    }

    private save(form: NgForm) {
        this.profileService.save(this.profile).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            this.cancel(form);
        });
    }

    private update() {
        this.profileService.update(this.profile.id, this.profile).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }
}
