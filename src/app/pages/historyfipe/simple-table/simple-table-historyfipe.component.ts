import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-simple-table-historyfipe',
  templateUrl: './simple-table-historyfipe.component.html',
  styleUrls: ['./simple-table-historyfipe.component.css']
})
export class SimpleTableHistoryfipeComponent implements OnInit {

    @Input() data: any[];

    ngOnInit(): void {
    }
}
