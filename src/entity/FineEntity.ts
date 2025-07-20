export class FineEntity {
    id: number = 0;
    infractionNotice: string;
    numberRenainf: number;
    infractionCode: number;
    dateTimeOfCommitment: Date;
    dueDate: Date;
    expirationInfraction: Date;
    clientId: number;
    vehicleId: number;
    value: number = 0;
    originalValue: number = 0;
    discount: number = 0;
    description: string;
    realOffender: boolean;
    accountId: number;
    cardId: number;
}
