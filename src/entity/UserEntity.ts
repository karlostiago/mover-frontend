import {ProfileEntity} from "./ProfileEntity";

export class UserEntity {
    id: number = 0;
    name: string;
    email: string;
    login: string;
    password: string;
    profiles = new Array<ProfileEntity>();
    active: boolean = true;
}
