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

    contact = new ContactEntity()
    client: ClientEntity;

    constructor(private alertService: AlertService) {
    }

    ngOnInit(): void {

    }

    showDialog(client: ClientEntity, contact: ContactEntity) {
        this.visible = true;
        this.client = client;
        this.contact = contact ? { ... contact} : new ContactEntity();
    }

    saveOrUpdate() {
        this.validTelephone();
        this.existsContact();
        this.client.id === 0 ? this.save() : this.update(this.contact);
        this.visible = false;
    }

    private save() {
        const contacts = this.client.contacts;
        this.contact.id = this.generatedId(contacts);
        this.client.contacts.push(this.contact);
    }

    private update(contact: ContactEntity) {
        const contacts = this.client.contacts;
        this.deleteContact(contact);
        contact.id = this.generatedId(contacts);
        this.client.contacts.push(contact);
    }

    private existsContact() {
        for (const contact of this.client.contacts) {
            if (contact.telephone === this.contact.telephone
                && contact.name === this.contact.name
                && contact.degreeKinship === this.contact.degreeKinship) {
                this.alertService.error("Já existe um contato com os dados informados.");
                throw Error();
            }
        }
    }

    private deleteContact(contact: ContactEntity) {
        this.client.contacts = this.client.contacts.filter(c => c.id !== contact.id);
    }

    private validTelephone() {
        const valid = this.contact?.telephone?.length < 10;
        if (valid) {
            this.alertService.error("Telefone inválido.");
            throw Error();
        }
    }

    private generatedId(contacts: Array<ContactEntity>) {
        return contacts.length == 0 ? 1 : contacts[contacts.length - 1].id + 1;
    }
}
