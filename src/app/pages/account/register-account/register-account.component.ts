import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../service/AlertService";
import {AccountEntity} from "../../../../entity/AccountEntity";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})
export class RegisterAccountComponent extends AbstractRegister implements OnInit {

    account = new AccountEntity();

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private accountService: AccountService) {
        super(activatedRoute);
    }

    ngOnInit(): void {
        if (!this.registerNew) {
            // this.modelService.findById(this.id).then(response => {
            //     this.model = response;
            //     this.selectedBrandId = this.model.brandId;
            // });
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.account.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    private save(form: NgForm) {
        // this.modelService.save(this.model).then(() => {
        //     this.alertService.success("Registro cadastrado com sucesso.");
        //     form.resetForm({
        //         active: true,
        //         name: "",
        //         color: "",
        //     });
        // });
    }

    private update() {
        // this.modelService.update(this.model.id, this.model).then(() => {
        //     this.alertService.success("Registro atualizado com sucesso.");
        // });
    }
}
