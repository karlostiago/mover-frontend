import {ActivatedRoute} from "@angular/router";

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
}
