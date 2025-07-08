import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-indicator-value',
  templateUrl: './card-indicator-value.component.html',
  styleUrls: ['./card-indicator-value.component.css']
})
export class CardIndicatorValueComponent implements OnInit {

    @Input() label: string = '';
    @Input() loading: boolean = false;
    @Input() quantity?: number;
    @Input() value: number = 0;

    ngOnInit(): void { }
}
