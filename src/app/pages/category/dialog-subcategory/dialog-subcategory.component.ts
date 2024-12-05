import {Component, Input, OnInit} from '@angular/core';
import {AlertService} from "../../../../service/AlertService";
import {CategoryEntity} from "../../../../entity/CategoryEntity";
import {SubCategoryEntity} from "../../../../entity/SubCategoryEntity";

@Component({
  selector: 'app-dialog-subcategory-contact',
  templateUrl: './dialog-subcategory.component.html',
  styleUrls: ['./dialog-subcategory.component.css']
})
export class DialogSubcategoryComponent implements OnInit {

    @Input() visible = false;

    category = new CategoryEntity()
    subcategory = new SubCategoryEntity();

    constructor(private alertService: AlertService) {
    }

    ngOnInit(): void {

    }

    showDialog(category: CategoryEntity, subcategory: SubCategoryEntity) {
        this.visible = true;
        this.category = category;
        this.subcategory = subcategory ? { ... subcategory} : new SubCategoryEntity();
    }

    saveOrUpdate() {
        this.exists();
        this.category.id === 0 ? this.save() : this.update(this.subcategory);
        this.visible = false;
    }

    private save() {
        const subcategories = this.category.subcategories;
        this.subcategory.id = this.generatedId(subcategories);
        this.category.subcategories.push(this.subcategory);
    }

    private update(subcategory: SubCategoryEntity) {
        const subcategories = this.category.subcategories;
        this.delete(subcategory);
        subcategory.id = this.generatedId(subcategories);
        this.category.subcategories.push(subcategory);
    }

    private exists() {
        for (const subcategory of this.category.subcategories) {
            if (subcategory.description === this.subcategory.description) {
                this.alertService.error("Já existe uma subcategoria com a descrição informada.");
                throw Error();
            }
        }
    }

    private delete(subcategory: SubCategoryEntity) {
        this.category.subcategories = this.category.subcategories.filter(c => c.id !== subcategory.id);
    }

    private generatedId(subcategories: Array<SubCategoryEntity>) {
        return subcategories.length == 0 ? 1 : subcategories[subcategories.length - 1].id + 1;
    }
}
