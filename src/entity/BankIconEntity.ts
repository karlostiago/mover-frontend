export class BankIconEntity {
    code: number = 0;
    prefix: string = "";
    bankName: string = "";
    urlImage: string = "";

    constructor(code?: number, urlImage?: string) {
        this.code = code?? 0;
        this.urlImage = urlImage ?? '';
    }
}
