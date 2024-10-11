import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../service/AlertService";
import {CategoryService} from "../category.service";
import {Table} from "primeng/table";
import {CategoryEntity} from "../../../../entity/CategoryEntity";

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.css']
})
export class SearchCategoryComponent implements OnInit {

    categories = new Array<CategoryEntity>();
    searchFilter: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this.categoryService.findAll().then(response => {
            this.categories = response;
        });
    }

    confirmationDelete(category: CategoryEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir esta Categoria?`,
            accept: () => {
                this.delete(category.id);
            }
        })
    }

    delete(id: number) {
        this.categoryService.delete(id).then(() => {
            this.categories = this.categories.filter(v => v.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.categoryService.findBy(this.searchFilter).then(response => {
            this.categories = response;
            this.table?.reset();
        });
    }
}
