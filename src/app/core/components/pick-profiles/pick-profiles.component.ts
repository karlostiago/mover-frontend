import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FunctionalityEntity} from "../../../../entity/FunctionalityEntity";
import {PermissionService} from "../../../pages/security/permission/permission.service";
import {LoaderService} from "../../loader/loader.service";

@Component({
  selector: 'app-pick-profiles',
  templateUrl: './pick-profiles.component.html',
  styleUrls: ['./pick-profiles.component.css']
})
export class PickProfilesComponent implements OnInit, OnChanges {

    features = new Array<FunctionalityEntity>();

    @Input() selectedFeatures = new Array<FunctionalityEntity>();

    @Output() values = new EventEmitter<Array<FunctionalityEntity>>();

    @Input() clear: boolean = false;

    constructor(private permissionService: PermissionService,
                private loadService: LoaderService) { }

    ngOnInit(): void {

    }

    async ngOnChanges(changes: SimpleChanges) {
        if (changes['clear']) {
            this.selectedFeatures = new Array<FunctionalityEntity>();
            await this.loadingFeatures();
        }
        if (changes['selectedFeatures']) {
            if (this.features) {
                this.features = this.features.filter(f =>
                    !this.selectedFeatures.some(s => s.id === f.id)
                );
            }
        }
    }

    toAdd(functionality: FunctionalityEntity) {
        this.transfer(functionality, this.features, this.selectedFeatures);
        this.values.emit(this.selectedFeatures);
    }

    remove(functionality: FunctionalityEntity) {
        this.transfer(functionality, this.selectedFeatures, this.features);
        this.values.emit(this.selectedFeatures);
    }

    private transfer(functionality: FunctionalityEntity, sourceList: Array<FunctionalityEntity>, targetList: Array<FunctionalityEntity>) {
        const index = sourceList.findIndex(item => item.id === functionality.id && item.codeMenu === functionality.codeMenu);
        if (index !== -1) {
            const [removedItem] = sourceList.splice(index, 1);
            targetList.push(removedItem);
        }
    }

    private async loadingFeatures() {
        this.loadService.automatic = false;
        await this.permissionService.findAllFeatures().then(response => {
            this.features = response;
        });
        this.loadService.automatic = true;
    }
}
