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
    value: number = 0;
    active: boolean = true;
    card: string;
    account: string;

    discount: number = 0;
    totalInstallment: number = 0;
    installmentValue: number = 0;
    dueDate: Date;
}
