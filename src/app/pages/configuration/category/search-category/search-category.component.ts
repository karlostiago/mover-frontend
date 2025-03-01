import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../../shared/service/AlertService";
import {CategoryService} from "../category.service";
import {CategoryEntity} from "../../../../../entity/CategoryEntity";
import {AuthService} from "../../../../core/login/auth.service";

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.css']
})
export class SearchCategoryComponent implements OnInit {

    category: CategoryEntity;
    categories = new Array<CategoryEntity>();
    searchFilter: string = "";

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                protected authService: AuthService,
                private categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this.categoryService.findAll().then(response => {
            this.categories = response;
        });
    }

    confirmationDelete(category: CategoryEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir esta categoria ${category.description}?`,
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
        });
    }
}
