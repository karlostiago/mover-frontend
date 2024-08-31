export class ClientEntity {
    id: number = 0;
    name: string = "";
    rg: number;
    cpfCnpj: string;
    homeNumber: number;
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
    active: boolean = true;
}
