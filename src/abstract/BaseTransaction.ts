import {TransactionEntity} from "../entity/TransactionEntity";

export abstract class BaseTransaction {

    protected constructor() { }

    public calculatesInstallmentValue(transaction: TransactionEntity) {
        const hasValue = transaction.value && transaction.value > 0;
        const hasInstallment = transaction.installment && transaction.installment > 1;
        if (hasValue == 0) {
            transaction.installmentValue = 0;
        } else if (hasValue && hasInstallment) {
            transaction.installmentValue = transaction.value / transaction.installment;
        }
    }

    updatePaid(transaction: TransactionEntity) {
        transaction.paid = this.validPaymentDate(transaction.paymentDate);
        transaction.paymentDate = transaction.paid ? transaction.paymentDate : null;
    }

    private validPaymentDate(date: any) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const fullYear = String(date.getFullYear())
        const parseDate = `${day}/${month}/${fullYear}`;
        if (parseInt(fullYear) <= 1800) {
            return false;
        }
        return !(parseDate.length === 10 && parseDate === '01/02/1800');
    }
}
