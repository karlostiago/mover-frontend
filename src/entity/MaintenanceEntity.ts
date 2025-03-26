export class MaintenanceEntity {
    id: number = 0;
    vehicleId: number;
    vehicleName: string;
    accountId: number;
    cardId: number;
    date: Date = new Date();
    mileage: number;
    establishment: string;
    type: string;
    detail: string;
    value: number;
    active: boolean = true;
    card: string;
    account: string;
}
