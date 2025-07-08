import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-indicator',
  templateUrl: './card-indicator.component.html',
  styleUrls: ['./card-indicator.component.css']
})
export class CardIndicatorComponent implements OnInit {

    @Input() label: string = '';
    @Input() loading: boolean = false;
    @Input() quantity: number = 0;

    ngOnInit(): void { }
}
