import {FunctionalityEntity} from "./FunctionalityEntity";

export class ProfileEntity {
    id: number = 0;
    description: string;
    permissions = new Array<FunctionalityEntity>()
    active: boolean = true;
}
