import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    @Input() showMenu: boolean;

    enableMenu() {
        this.showMenu = !this.showMenu;
    }

    hideMenu() {
        this.showMenu = false;
    }
}
