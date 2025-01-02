import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";

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
}
