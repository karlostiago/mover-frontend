import {SymbolEntity} from "./SymbolEntity";

export class BrandEntity {
    id: number = 0;
    name: string = "";
    symbol = new SymbolEntity();
    active: boolean = true;
}
