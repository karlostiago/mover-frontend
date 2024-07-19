import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    automatic: boolean = true;
    isLoading = new Subject<boolean>();

    constructor() {
    }

    show() {
        this.isLoading.next(true)
    }

    hide() {
        this.isLoading.next(false);
    }
}
