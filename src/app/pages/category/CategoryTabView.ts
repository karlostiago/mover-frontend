import {CategoryEntity} from "../../../entity/CategoryEntity";

export class CategoryTabView {
    income: string = 'RECEITA';
    expense: string = 'DESPESA';
    investment: string = 'INVESTIMENTO';
    transfer: string = 'TRANSFERÊNCIA';
    corporateCapital: string = 'CAPITAL SOCIETÁRIO';

    activeIndex: number = 0;

    hasNotIncome: boolean = false;
    hasNotExpense: boolean = false;
    hasNotInvestment: boolean = false;
    hasNotTransfer: boolean = false;
    hasNotCorporateCapital: boolean = false;

    updateTabView(categories: Array<CategoryEntity>) {
        if (categories.length === 0) {
            return 0;
        }
        return this.tabMap().get(categories[0].type) ?? 0;
    }

    disabledTabView(categories: Array<CategoryEntity>) {
        this.hasNotIncome = !this.enableTab(categories, this.income);
        this.hasNotExpense = !this.enableTab(categories, this.expense);
        this.hasNotInvestment = !this.enableTab(categories, this.investment);
        this.hasNotTransfer = !this.enableTab(categories, this.transfer);
        this.hasNotCorporateCapital = !this.enableTab(categories, this.corporateCapital);
    }

    private enableTab(categories: Array<CategoryEntity>, type: string) {
        for (const category of categories) {
            if (category.type === type) {
                return this.tabMap().get(type) !== -1;
            }
        }
        return false;
    }

    private tabMap() {
        return new Map<string, number>([
            [this.income, 0],
            [this.expense, 1],
            [this.investment, 2],
            [this.transfer, 3],
            [this.corporateCapital, 4]
        ]) ?? -1;
    }
}
