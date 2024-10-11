import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../service/AlertService";
import {SubCategoryService} from "../subcategory.service";
import {Table} from "primeng/table";
import {CategoryEntity} from "../../../../entity/CategoryEntity";
import {SubCategoryEntity} from "../../../../entity/SubCategoryEntity";

@Component({
  selector: 'app-search-subcategory',
  templateUrl: './search-subcategory.component.html',
  styleUrls: ['./search-subcategory.component.css']
})
export class SearchSubcategoryComponent implements OnInit {

    subcategories = new Array<SubCategoryEntity>();
    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private subCategoryService: SubCategoryService) {
    }

    ngOnInit(): void {
        this.subCategoryService.findAll().then(response => {
            this.subcategories = response;
        });
    }

    confirmationDelete(category: CategoryEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir esta Subcategoria?`,
            accept: () => {
                this.delete(category.id);
            }
        })
    }

    delete(id: number) {
        this.subCategoryService.delete(id).then(() => {
            this.subcategories = this.subcategories.filter(v => v.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.subCategoryService.findBy(this.searchFilter).then(response => {
            this.subcategories = response;
            this.table?.reset();
        });
    }
}
