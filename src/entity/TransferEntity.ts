export class TransferEntity {
    id: number = 0;
    description: string = "";
    subcategoryId: number = 0;
    installments: number = 0;
    period: string;
    paymentType: string;
    dueDate: Date;
    paymentDate: Date | null;
    totalValue: number = 0;
    calculedValue: number = 0;
    sourceAccountId: number = 0;
    destinationAccountId: number = 0;
    transactionId: number = 0;
    active: boolean = true;
    paid: boolean = false;
}
