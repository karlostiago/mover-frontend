import {Component, Input, OnInit} from '@angular/core';
import {SummaryFipeEntity} from "../../../../entity/SummaryFipeEntity";
import {FipeService} from "../fipe.service";

@Component({
  selector: 'app-dialog-fipe',
  templateUrl: './dialog-fipe.component.html',
  styleUrls: ['./dialog-fipe.component.css']
})
export class DialogFipeComponent implements OnInit {

    @Input() visible = false;

    summaries: Array<SummaryFipeEntity> = [];

    constructor(private fipeService: FipeService) {
    }

    ngOnInit(): void {

    }

    async showDialog(vehicleId: number) {
        this.visible = true;
        this.summaries = new Array<SummaryFipeEntity>();
        await this.fipeService.findByVehicleId(vehicleId).then(response => {
            this.summaries.push(response);
        });
        if (this.summaries[0].valueAcquisition === 0) {
            this.summaries = new Array<SummaryFipeEntity>();
        }
    }
}
