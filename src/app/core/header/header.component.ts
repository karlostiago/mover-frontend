import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    showMenu: boolean;

    open() {
        this.showMenu = true;
        document.body.classList.add('overflow-hidden');
    }

    hide() {
        this.showMenu = false;
        document.body.classList.remove('overflow-hidden');
    }
}
