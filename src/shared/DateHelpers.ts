export class DateHelpers {

    static toUTC(date: Date) {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
}
