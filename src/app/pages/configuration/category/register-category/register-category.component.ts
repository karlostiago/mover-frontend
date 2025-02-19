import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../service/AlertService";
import {CategoryService} from "../category.service";
import {CategoryEntity} from "../../../../../entity/CategoryEntity";
import {CategoryTypeEntity} from "../../../../../entity/CategoryTypeEntity";
import {GlobalDialogService, TypeDialog} from "../../../../../shared/service/GlobalDialogService";
import {SubCategoryEntity} from "../../../../../entity/SubCategoryEntity";
import {AuthService} from "../../../../core/login/auth.service";

@Component({
  selector: 'app-register-category',
  templateUrl: './register-category.component.html',
  styleUrls: ['./register-category.component.css']
})
export class RegisterCategoryComponent extends AbstractRegister implements OnInit {

    category = new CategoryEntity();
    categoryTypes = new Array<CategoryTypeEntity>();

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private globalDialogService: GlobalDialogService,
                protected authService: AuthService,
                private categoryService: CategoryService) {
        super(activatedRoute);
    }

    ngOnInit(): void {
        this.loadingFuelTypes();
        if (!this.registerNew) {
            this.categoryService.findById(this.id).then(response => {
                this.category = response;
            });
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.category.id) {
            this.update();
        } else {
            this.save(form);
        }
    }

    deleteSubcategory(subcategory: SubCategoryEntity) {
        this.category.subcategories = this.category.subcategories.filter(s => s.id !== subcategory.id);
    }

    openDialogSubcategory() {
        this.globalDialogService.openDialog(TypeDialog.SUBCATEGORY, this.category);
    }

    updateOpenDialogSubcategory(subcategory: SubCategoryEntity) {
        this.globalDialogService.openDialog(TypeDialog.SUBCATEGORY, this.category, subcategory);
    }

    activeOrDesactive(subcategory: SubCategoryEntity) {
        subcategory.active = !subcategory.active;
    }

    private save(form: NgForm) {
        this.categoryService.save(this.category).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            this.category.subcategories = new Array<SubCategoryEntity>();
            form.resetForm({
                active: true
            });
        });
    }

    private update() {
        this.categoryService.update(this.category.id, this.category).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }

    private loadingFuelTypes() {
        this.categoryService.findAllTypes().then(response => {
            this.categoryTypes = [{ code: 0, description: 'Selecione'}, ...response];
        });
    }
}
