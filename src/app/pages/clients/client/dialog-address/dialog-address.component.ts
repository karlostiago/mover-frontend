import {Component, Input, OnInit} from '@angular/core';
import {ClientEntity} from "../../../../../entity/ClientEntity";

@Component({
  selector: 'app-dialog-address',
  templateUrl: './dialog-address.component.html',
  styleUrls: ['./dialog-address.component.css']
})
export class DialogAddressComponent implements OnInit {

    @Input() visible = false;
    clients = new Array<ClientEntity>();

    ngOnInit(): void {

    }

    showDialog(client: ClientEntity) {
        this.visible = true;
        this.clients = [];
        this.clients.push(client);
    }
}
