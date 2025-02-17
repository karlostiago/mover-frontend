import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryEntity} from "../../../../entity/CategoryEntity";
import {AuthService} from "../../../core/login/auth.service";

@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.css']
})
export class TableCategoryComponent implements OnInit {

    @Input() categories = new Array<CategoryEntity>();

    @Output() delete = new EventEmitter<CategoryEntity>();

    constructor(protected authService: AuthService) {
    }

    ngOnInit(): void { }

    confirmationDelete(category: CategoryEntity) {
        this.delete.emit(category);
    }
}
