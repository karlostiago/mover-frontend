import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface InputField {
    label: string;
    value: any;
    col: number;
    visible: boolean;
}

@Component({
  selector: 'app-sidebar-details',
  templateUrl: './sidebar-details.component.html',
  styleUrls: ['./sidebar-details.component.css']
})
export class SidebarDetailsComponent implements OnInit {

    @Input() value: any;
    @Input() visible: boolean = false;
    @Input() fields = new Array<InputField>();

    @Output() visibleChange = new EventEmitter<boolean>();

    ngOnInit(): void {

    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }
}
