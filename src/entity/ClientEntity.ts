import {ContactEntity} from "./ContactEntity";

export class ClientEntity {
    id: number = 0;
    name: string = "";
    rg: number;
    cpfCnpj: string;
    number: number;
    motherName: string = "";
    brazilianStateCode: number | null;
    neighborhood: string;
    publicPlace: string;
    city: string;
    complement: string;
    typePersonCode: number;
    birthDate: Date;
    postalCode: number;
    email: string;
    telephone: string;
    cellPhone: string;
    uf: string;
    active: boolean = true;
    contacts = new Array<ContactEntity>();
}
