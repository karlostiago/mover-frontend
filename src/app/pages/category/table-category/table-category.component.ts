import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryEntity} from "../../../../entity/CategoryEntity";

@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.css']
})
export class TableCategoryComponent implements OnInit {

    @Input() categories = new Array<CategoryEntity>();

    @Output() delete = new EventEmitter<CategoryEntity>();

    ngOnInit(): void { }

    confirmationDelete(category: CategoryEntity) {
        this.delete.emit(category);
    }
}
