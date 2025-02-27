import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../shared/service/AlertService";
import {UserService} from "../user.service";
import {UserEntity} from "../../../../../entity/UserEntity";
import {ProfileEntity} from "../../../../../entity/ProfileEntity";
import {ProfileService} from "../../profile/profile.service";
import {AuthService} from "../../../../core/login/auth.service";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent extends AbstractRegister implements OnInit {

    user = new UserEntity();
    profiles = new Array<ProfileEntity>();

    confirmPassword: string;

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private profileService: ProfileService,
                protected authService: AuthService,
                private userService: UserService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        await this.loadingProfiles();

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

    updateLoginName() {
        this.user['login'] = this.user['email'];
    }

    validatePassword() {
        if (this.user['password'] && this.user['password'].length === 1) {
            this.alertService.info("A senha precisa ter pelo menos 6 caracteres.")
        }
    }

    private save(form: NgForm) {
        const isPasswordValid = this.user['password'].length > 5;
        const isConfirmPassword = this.user['password'] === this.confirmPassword;
        if (!isPasswordValid) {
            this.alertService.error('Senha inválida, quantidade de caracteres insuficiente.');
        } else if (!isConfirmPassword) {
            this.alertService.error('Senha e confirma senha não confere.');
        } else {
            this.userService.save(this.user).then(() => {
                this.alertService.success("Registro cadastrado com sucesso.");
                form.resetForm({
                    active: true
                });
            });
        }
    }

    private update() {
        this.userService.update(this.user.id, this.user).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }

    private async loadingProfiles() {
        await this.profileService.findAll().then(response => {
            this.profiles = response;
        })
    }
}
