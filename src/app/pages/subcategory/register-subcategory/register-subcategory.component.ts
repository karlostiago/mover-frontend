import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AbstractRegister} from "../../../../abstract/AbstractRegister";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../service/AlertService";
import {SubCategoryService} from "../subcategory.service";
import {CategoryEntity} from "../../../../entity/CategoryEntity";
import {SubCategoryEntity} from "../../../../entity/SubCategoryEntity";
import {CategoryService} from "../../category/category.service";

@Component({
  selector: 'app-register-subcategory',
  templateUrl: './register-subcategory.component.html',
  styleUrls: ['./register-subcategory.component.css']
})
export class RegisterSubcategoryComponent extends AbstractRegister implements OnInit {

    subcategory = new SubCategoryEntity();
    categories = new Array<CategoryEntity>();

    constructor(protected override activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private categoryService: CategoryService,
                private subCategoryService: SubCategoryService) {
        super(activatedRoute);
    }

    ngOnInit(): void {
        this.loadingCategories();
        if (!this.registerNew) {
            this.subCategoryService.findById(this.id).then(response => {
                this.subcategory = response;
            });
        }
    }

    saveOrUpdate(form: NgForm) {
        if (this.subcategory.id) {
            this.update();
        } else {
            this.save(form);
        }
    }


    private save(form: NgForm) {
        this.subCategoryService.save(this.subcategory).then(() => {
            this.alertService.success("Registro cadastrado com sucesso.");
            form.resetForm({
                active: true
            });
        });
    }

    private update() {
        this.subCategoryService.update(this.subcategory.id, this.subcategory).then(() => {
            this.alertService.success("Registro atualizado com sucesso.");
        });
    }

    private loadingCategories() {
        this.categoryService.findAll().then(response => {
            this.categories = response;
        });
    }
}
