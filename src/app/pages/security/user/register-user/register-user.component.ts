import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../service/AlertService";
import {UserService} from "../user.service";
import {PartnerEntity} from "../../../../../entity/PartnerEntity";
import {UserEntity} from "../../../../../entity/UserEntity";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent extends AbstractRegister implements OnInit {

    partner = new PartnerEntity();
    user = new UserEntity();

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private userService: UserService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        if (!this.registerNew) {
            this.userService.findById(this.id).then(response => {
                this.user = response;
            });
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.user.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    private save(form: NgForm) {
        this.userService.save(this.user).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            form.resetForm({
                active: true
            });
        });
    }

    private update() {
        this.userService.update(this.partner.id, this.user).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }
}
