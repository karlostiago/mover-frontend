export class DateHelpers {

    static toUTC(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    static getMonthAndYear(date: Date) {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${year}`;
    }
}
