import {Component, Input, OnInit} from '@angular/core';
import {ChartType} from "chart.js";

@Component({
  selector: 'app-card-indicator-chart',
  templateUrl: './card-indicator-chart.component.html',
  styleUrls: ['./card-indicator-chart.component.css']
})
export class CardIndicatorChartComponent implements OnInit {

    @Input() label: string = '';
    @Input() loading: boolean = false;
    @Input() data: any;
    @Input() options: any;
    @Input() type: ChartType = 'doughnut'

    ngOnInit(): void { }
}
