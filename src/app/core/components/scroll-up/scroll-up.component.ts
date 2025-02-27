import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-scroll-up',
  templateUrl: './scroll-up.component.html',
  styleUrls: ['./scroll-up.component.css']
})
export class ScrollUpComponent implements OnInit {

    ngOnInit(): void { }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
