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
}
