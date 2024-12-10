import {Component, OnInit} from '@angular/core';
import {CategoryEntity} from "../../../../entity/CategoryEntity";

@Component({
  selector: 'app-dialog-list-subcategory-contact',
  templateUrl: './dialog-list-subcategory.component.html',
  styleUrls: ['./dialog-list-subcategory.component.css']
})
export class DialogListSubcategoryComponent implements OnInit {

    visible = false;
    category = new CategoryEntity()

    ngOnInit(): void { }

    showDialog(category: CategoryEntity) {
        this.visible = true;
        this.category = category;
    }
}
