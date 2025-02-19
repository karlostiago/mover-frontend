import {Component, Input, OnInit} from '@angular/core';
import {AlertService} from "../../../../../service/AlertService";
import {CategoryEntity} from "../../../../../entity/CategoryEntity";
import {SubCategoryEntity} from "../../../../../entity/SubCategoryEntity";

@Component({
  selector: 'app-dialog-subcategory',
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
        this.category.id === 0 ? this.save() : this.update();
        this.visible = false;
    }

    private save() {
        const subcategories = this.category.subcategories;

        if (subcategories.length !== 0) {
            const index = subcategories.findIndex(s => s.id === this.subcategory.id);
            if (index !== -1) {
                this.category.subcategories.splice(index, 1);
            }
        }

        this.subcategory.id = this.generatedId(subcategories);
        this.category.subcategories.push(this.subcategory);
    }

    private update() {
        if (this.subcategory.id > 0) {
            this.delete(this.subcategory);
            this.category.subcategories.push(this.subcategory);
        } else {
            this.save();
        }
    }

    private exists() {
        for (const subcategory of this.category.subcategories) {
        if (subcategory.id !== this.subcategory.id
                    && this.normalize(subcategory.description) === this.normalize(this.subcategory.description)) {
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

    private normalize(str: string) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .toUpperCase();
    }
}
