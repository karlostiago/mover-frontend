import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemMaintenanceEntity} from "../../../../../entity/ItemMaintenanceEntity";

@Component({
  selector: 'app-table-maintenance',
  templateUrl: './table-maintenance.component.html',
  styleUrls: ['./table-maintenance.component.css']
})
export class TableMaintenanceComponent implements OnInit {

    @Input() title: string;
    @Input() items = new Array<ItemMaintenanceEntity>();

    @Output() add = new EventEmitter<ItemMaintenanceEntity>();

    item: ItemMaintenanceEntity = new ItemMaintenanceEntity();

    ngOnInit(): void {

    }

    save() {
        this.add.emit(this.item);
        this.item = new ItemMaintenanceEntity();
    }
}
