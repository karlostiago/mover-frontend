import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HealthCheckService} from "../../../../service/HealthCheckService";
import {HealthCheckEntity} from "../../../../entity/HealthCheckEntity";

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

    productionEnviroment: boolean = false;
    version: string = "";
    running: boolean = false;

    constructor(private healhCheckService: HealthCheckService) { }

    ngOnInit(): void {
        this.productionEnviroment = environment.production;
        this.version = environment.version;

        this.healhCheckService.isRunning().then(response => {
            this.running = response.running;
            console.log(this.running);
        })
    }
}
