import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-group-table-historyfipe',
  templateUrl: './group-table-historyfipe.component.html',
  styleUrls: ['./group-table-historyfipe.component.css']
})
export class GroupTableHistoryfipeComponent implements OnInit {

    @Input() data: any[];

    ngOnInit(): void {
    }
}
