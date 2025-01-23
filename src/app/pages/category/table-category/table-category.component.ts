import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryEntity} from "../../../../entity/CategoryEntity";
import {ColorRandom} from "../../../../shared/ColorRandom";

@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.css']
})
export class TableCategoryComponent implements OnInit {

    _categories = new Array<CategoryEntity>();

    @Input() categoryType: string;

    @Output() delete = new EventEmitter<CategoryEntity>();

    @Input() set categories(values: Array<CategoryEntity>) {
        this._categories = values.filter(c => c.type === this.categoryType);
        this._categories.forEach(category => {
            category['randomColor'] = ColorRandom.color();
        });
    }

    ngOnInit(): void {

    }

    confirmationDelete(category: CategoryEntity) {
        this.delete.emit(category);
    }

    getColors(category: CategoryEntity) {
        return `color: var(${category['randomColor']});`;
    }
}
