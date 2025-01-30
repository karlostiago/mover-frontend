import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AlertService} from "../../../../service/AlertService";
import {CategoryService} from "../category.service";
import {CategoryEntity} from "../../../../entity/CategoryEntity";
import {CategoryTabView} from "../CategoryTabView";

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.css']
})
export class SearchCategoryComponent implements OnInit {

    category: CategoryEntity;
    categories = new Array<CategoryEntity>();
    searchFilter: string = "";

    categoryTabView = new CategoryTabView();

    constructor(private confirmationService: ConfirmationService,
                private alertService: AlertService,
                private categoryService: CategoryService) {
    }

    ngOnInit(): void {
        // @ts-ignore
        this.categoryTabView.activeIndex = Number.parseInt(localStorage.getItem("CATEGORY_TAB_VIEW_CURRENT_INDEX"));
        localStorage.setItem("CATEGORY_TAB_VIEW_CURRENT_INDEX", String(0));
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
            this.categoryTabView.activeIndex = this.categoryTabView.updateTabView(this.categories);
            this.categoryTabView.disabledTabView(this.categories);

            if (!this.searchFilter) {
                this.categoryTabView.activeIndex  = 0;
                localStorage.setItem("CATEGORY_TAB_VIEW_CURRENT_INDEX", String(0));
            }
        });
    }

    onTabeChange(e: any) {
        localStorage.setItem("CATEGORY_TAB_VIEW_CURRENT_INDEX", e.index);
        this.categoryTabView.activeIndex = e.index;
    }
}
