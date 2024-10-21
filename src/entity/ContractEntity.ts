export class ContractEntity {
    id: number = 0;
    number: string = "";
    vehicleId: number;
    vehicleName: string = "";
    clientId: number;
    clientName: string = "";
    initialDate: Date;
    endDate: Date;
    billingStartDate: Date;
    depositAmount: number = 0;
    recurrenceValue: number = 0;
    paymentFrequency: string = "";
    situation: string = "";
    paymentDay: string = "";
    reason: string = "";
    active: boolean = true;
    friendlyTermination: boolean = true;
}
