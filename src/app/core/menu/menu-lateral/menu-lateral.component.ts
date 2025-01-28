import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HealthCheckService} from "../../../../service/HealthCheckService";

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

    productionEnviroment: boolean = false;
    resizeListener: any;
    version: string = "";
    running: boolean = false;

    @Input() expendMenu: boolean;
    @Input() showMenu: boolean;
    @Output() hideMenu = new EventEmitter<boolean>;

    constructor(private healhCheckService: HealthCheckService) { }

    ngOnInit(): void {
        this.productionEnviroment = environment.production;
        this.version = environment.version;

        this.healhCheckService.isRunning().then(response => {
            this.running = response.running;
        });

        let screenWidth = window.innerWidth;

        this.resizeListener = () => {
            screenWidth = window.innerWidth;
            if (screenWidth <= 768) {
                this.showMenu = false;
            }
        };

        window.addEventListener('resize', this.resizeListener);
    }

    showOrHideMenu() {
        this.showMenu = !this.showMenu;
        this.hideMenu.emit(true);
    }
}
