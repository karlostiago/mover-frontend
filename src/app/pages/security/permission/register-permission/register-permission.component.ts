import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../shared/service/AlertService";
import {PermissionService} from "../permission.service";
import {PartnerEntity} from "../../../../../entity/PartnerEntity";
import {PermissionTypeEntity} from "../../../../../entity/PermissionTypeEntity";
import {PermissionEntity} from "../../../../../entity/PermissionEntity";
import {UserEntity} from "../../../../../entity/UserEntity";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-register-permission',
  templateUrl: './register-permission.component.html',
  styleUrls: ['./register-permission.component.css']
})
export class RegisterPermissionComponent extends AbstractRegister implements OnInit {

    partner = new PartnerEntity();

    permissionTypes = new Array<PermissionTypeEntity>();
    permission = new PermissionEntity();
    users = new Array<UserEntity>()

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private permissionService: PermissionService,
                private userService: UserService) {
        super(activatedRoute);
    }

    async ngOnInit() {

        this.permissionService.findAllPermissionTypes().then(response => {
            this.permissionTypes = [ { code: 0, description: 'Selecione' }, ...response];
        });

        this.userService.findAll().then(response => {
            // @ts-ignore
            this.users = [ { id: 0, login: 'Selecione' }, ...response ];
        })

        if (!this.registerNew) {
            this.permissionService.findById(this.id).then(response => {
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
        this.permissionService.save(this.partner).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            form.resetForm({
                active: true
            });
        });
    }

    private update() {
        this.permissionService.update(this.partner.id, this.partner).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }
}
