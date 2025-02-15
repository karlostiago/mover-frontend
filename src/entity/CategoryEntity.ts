import {SubCategoryEntity} from "./SubCategoryEntity";

export class CategoryEntity {
    id: number = 0;
    description: string = "";
    type: string = "";
    originalType: string = "";
    active: boolean = true;
    subcategories = new Array<SubCategoryEntity>();
}
