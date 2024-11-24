export class TransactionEntity {
    id: number = 0;
    description: string = "";
    subcategoryId: number = 0;
    installment: number = 0;
    period: string;
    paymentType: string;
    categoryType: string;
    dueDate: Date;
    paymentDate: Date | null;
    totalValue: number = 0;
    installmentValue: number = 0;
    cardId: number = 0;
    accountId: number = 0;
    destinationAccountId: number = 0;
    vehicleId: number = 0;
    contractId: number = 0;
    active: boolean = true;
    paid: boolean = false;
}
