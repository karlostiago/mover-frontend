import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-indicator-list',
  templateUrl: './card-indicator-list.component.html',
  styleUrls: ['./card-indicator-list.component.css']
})
export class CardIndicatorListComponent implements OnInit {

    @Input() label: string = '';
    @Input() loading: boolean = false;
    @Input() totalValue: number = 0;
    @Input() items: any[] = [];
    @Input() invoice: boolean = false;

    ngOnInit(): void { }
}
