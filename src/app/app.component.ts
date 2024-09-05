import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {GlobalDialogService} from "../shared/service/GlobalDialogService";
import {GlobalDialogComponent} from "../shared/dialog/global-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    title = 'mover';

    @ViewChild(GlobalDialogComponent) globalDialog: GlobalDialogComponent;

    constructor(private globalDialogService: GlobalDialogService) { }

    ngAfterViewInit(): void {
        this.globalDialogService.register(this.globalDialog);
    }
}
