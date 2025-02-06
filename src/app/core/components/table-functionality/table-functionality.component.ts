import {Component, OnInit} from '@angular/core';
import {FunctionalityEntity} from "../../../../entity/FunctionalityEntity";
import {PermissionService} from "../../../pages/security/permission/permission.service";

@Component({
  selector: 'app-table-functionality',
  templateUrl: './table-functionality.component.html',
  styleUrls: ['./table-functionality.component.css']
})
export class TableFunctionalityComponent implements OnInit {

    features = new Array<FunctionalityEntity>();

    constructor(private permissionService: PermissionService) { }

    ngOnInit(): void {
        this.permissionService.findAllFeatures().then(response => {
            this.features = response;
        });
    }

    activate(functionality: FunctionalityEntity) {
        functionality.active = true;
    }

    disable(functionality: FunctionalityEntity) {
        functionality.active = false;
    }
}
