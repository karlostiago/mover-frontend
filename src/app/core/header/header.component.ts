import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    showMenu: boolean;
    expendMenu: boolean = false;
    resizeListener: any;

    ngOnInit(): void {
        let screenWidth = window.innerWidth;
        this.resizeListener = () => {
            screenWidth = window.innerWidth;
            if (screenWidth <= 768) {
                this.showMenu = false;
                this.expendMenu = false;
            }
        };

        window.addEventListener('resize', this.resizeListener);
    }

    open() {
        this.showMenu = true;
        this.expendMenu = true;
        document.body.classList.add('overflow-hidden');
    }

    hide() {
        this.showMenu = false;
        this.expendMenu = false;
        document.body.classList.remove('overflow-hidden');
    }

    get username() {
        return localStorage.getItem("APP_USERNAME")
    }
}
