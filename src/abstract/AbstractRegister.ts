import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {DateHelpers} from "../shared/helper/DateHelpers";

export abstract class AbstractRegister  {

    protected registerNew = true;
    protected id = -1;

    protected constructor(protected activatedRoute: ActivatedRoute) {
        if (this.activatedRoute.snapshot.params['id']) {
            this.registerNew = false;
            this.id = this.activatedRoute.snapshot.params['id'];
        }
    }

    isNewRegister(){
        return this.registerNew;
    }

    cancel(form: NgForm) {
        form.resetForm({
            active: true,
        });
    }

    protected validDate(date: Date | null) {
        if (date === null) return null;
        return date && !date.toString().includes('1800')
    }

    protected generatedSurroundingDueDate(dueDate: Date, monthBefore: number, monthAfter: number) {
        const invoices = new Array<Date>();
        for (let i = monthBefore; i >= 1; i--) {
            const date = new Date(dueDate);
            date.setMonth(date.getMonth() - i);
            invoices.push(date);
        }

        invoices.push(new Date(dueDate));

        for (let i = 1; i <= monthAfter; i++) {
            const date = new Date(dueDate);
            date.setMonth(date.getMonth() + i);
            invoices.push(date);
        }

        return invoices.map(date => ({
            label: `${DateHelpers.formatLongDate(date, false).toUpperCase()}`,
            value: date
        }));
    }

    protected clone(obj: any) {
        const clone = {...obj};
        for (const key in clone) {
            if (clone[key] instanceof Date) {
                clone[key] = DateHelpers.toUTCWithHour(clone[key]);
            }
        }
        return clone;
    }
}
