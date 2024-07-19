import {Component} from '@angular/core';
import {Subject} from "rxjs";
import {LoaderService} from "./loader.service";
import {ngxLoadingAnimationTypes} from "ngx-loading";

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

    public loading: Subject<boolean> = this.loaderService.isLoading;

    constructor(private loaderService: LoaderService) {
    }

    protected readonly ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
}
