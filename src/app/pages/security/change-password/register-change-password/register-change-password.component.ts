import {Component, OnInit} from '@angular/core';
import {AbstractRegister} from "../../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../shared/service/AlertService";
import {ChangePasswordService} from "../change-password.service";
import {UserEntity} from "../../../../../entity/UserEntity";
import {AuthService} from "../../../../core/login/auth.service";

@Component({
  selector: 'app-register-change-password',
  templateUrl: './register-change-password.component.html',
  styleUrls: ['./register-change-password.component.css']
})
export class RegisterChangePasswordComponent extends AbstractRegister implements OnInit {

    user = new UserEntity();
    confirmPassword: string;

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                protected authService: AuthService,
                private userService: ChangePasswordService) {
        super(activatedRoute);
    }

    async ngOnInit() {
        if (!this.registerNew) {
            this.userService.findById(this.id).then(response => {
                this.user = response;
            });
        }
    }

    save() {
        const isPasswordValid = this.user['password'].length > 5;
        const isConfirmPassword = this.user['password'] === this.confirmPassword;
        if (!isPasswordValid) {
            this.alertService.error('Senha inválida, quantidade de caracteres insuficiente.');
        } else if (!isConfirmPassword) {
            this.alertService.error('Senha e confirma senha não confere.');
        } else {
            this.userService.changePassword(this.user).then(() => {
                this.alertService.success('Senha alterada com sucesso');
            });
        }
    }
}
