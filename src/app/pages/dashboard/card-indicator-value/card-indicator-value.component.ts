import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

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
    @Input() filterParams: any = '';

    constructor(private router: Router) { }

    ngOnInit(): void { }

    navigateToTransactions() {
        void this.router.navigate(['/transactions'], {
            queryParams: this.filterParams
        })
    }
}
