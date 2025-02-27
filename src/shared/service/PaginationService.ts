import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class PaginationService {

    storedData: any[] = [];
    currentPage = 0;
    remainingPages = 0;

    clear() {
        this.storedData = [];
        this.currentPage = 0;
        this.remainingPages = 0;
    }
}
