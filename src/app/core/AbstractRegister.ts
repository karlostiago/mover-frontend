import {ActivatedRoute} from "@angular/router";

export abstract class AbstractRegister  {

    protected registerNew = true;

    protected constructor(protected activatedRoute: ActivatedRoute) {
        if (this.activatedRoute.snapshot.params['id']) {
            this.registerNew = false;
        }
    }

    isNewRegister(){
        return this.registerNew;
    }
}
