import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

    productionEnviroment: boolean = false;
    version: string = "";

    ngOnInit(): void {
        this.productionEnviroment = environment.production;
        this.version = environment.version;
    }
}
