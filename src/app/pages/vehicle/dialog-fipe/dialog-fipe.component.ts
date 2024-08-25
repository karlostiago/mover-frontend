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

    showDialogFipe(vehicleId: number) {
        this.visible = true;
        this.summaries = new Array<SummaryFipeEntity>();
        this.fipeService.findByVehicleId(vehicleId).then(response => {
            this.summaries.push(response);
        });
    }
}