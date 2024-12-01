export class TransactionEntity {
    id: number = 0;
    description: string = "";
    subcategoryId: number = 0;
    installment: number = 0;
    frequency: string;
    paymentType: string;
    categoryType: string;
    category: string;
    subcategory: string;
    dueDate: Date;
    paymentDate: Date | null;
    value: number = 0;
    installmentValue: number = 0;
    cardId: number = 0;
    accountId: number = 0;
    destinationAccountId: number = 0;
    vehicleId: number = 0;
    contractId: number = 0;
    active: boolean = true;
    paid: boolean = false;
    transactionType: string;
}
