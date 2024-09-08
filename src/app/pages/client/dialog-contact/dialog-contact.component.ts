import {Component, Input, OnInit} from '@angular/core';
import {ClientEntity} from "../../../../entity/ClientEntity";
import {ContactEntity} from "../../../../entity/ContactEntity";
import {AlertService} from "../../../../service/AlertService";

@Component({
  selector: 'app-dialog-contact',
  templateUrl: './dialog-contact.component.html',
  styleUrls: ['./dialog-contact.component.css']
})
export class DialogContactComponent implements OnInit {

    @Input() visible = false;

    referenceContact = new ContactEntity()
    client: ClientEntity;

    constructor(private alertService: AlertService) {
    }

    ngOnInit(): void {

    }

    showDialog(client: ClientEntity) {
        this.visible = true;
        this.client = client;
        this.referenceContact = new ContactEntity();
    }

    save() {
        this.existsContact();
        const contacts = this.client.contacts;
        this.referenceContact.id = this.generatedId(contacts);
        this.client.contacts.push(this.referenceContact);
        this.visible = false;
    }

    private existsContact() {
        for (const contact of this.client.contacts) {
            if (contact.telephone === this.referenceContact.telephone
                && contact.name === this.referenceContact.name
                && contact.degreeKinship === this.referenceContact.degreeKinship) {
                this.alertService.error("Já existe um contato com os dados informados.");
                throw Error();
            }
        }
    }

    private generatedId(contacts: Array<ContactEntity>) {
        return contacts.length == 0 ? 1 : contacts[contacts.length - 1].id + 1;
    }
}
