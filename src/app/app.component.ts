import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {DialogFipeComponent} from "./pages/vehicle/dialog-fipe/dialog-fipe.component";
import {DialogService} from "../shared/service/DialogService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    title = 'mover';

    @ViewChild(DialogFipeComponent) dialogFipe: DialogFipeComponent;

    constructor(private dialogService: DialogService) { }

    ngAfterViewInit(): void {
        this.dialogService.registerDialogFipe(this.dialogFipe);
    }
}
