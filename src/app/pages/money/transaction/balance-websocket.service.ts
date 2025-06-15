import {Injectable, OnDestroy} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Client, IMessage} from "@stomp/stompjs";
import {Subject} from "rxjs";
import * as SockJS from "sockjs-client";

@Injectable({
  providedIn: 'root'
})
export class BalanceWebsocketService implements OnDestroy {

    protected baseURL = environment.apiUrl;

    private client: Client;
    private balanceUpdatedSubject = new Subject<void>();

    balanceUpdated$ = this.balanceUpdatedSubject.asObservable();

    constructor() {
        this.start();
    }

    disconnect() {
        if (this.client && this.client.active) {
            void this.client.deactivate();
        }
    }

    ngOnDestroy(): void {
        this.disconnect();
    }

    private start() {
        const path = `${this.baseURL}/ws`;

        this.client = new Client({
            webSocketFactory: () => new SockJS(path),
            reconnectDelay: 5000
        });

        this.client.onConnect = () => {
            this.client.subscribe('/topic/balance-update', (message: IMessage) => {
                this.balanceUpdatedSubject.next();
            });
        };

        this.client.activate();
    }
}
