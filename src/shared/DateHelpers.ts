export class DateHelpers {

    static toUTC(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    static toISOToString(date: Date) {
        console.log(date);
        return date.toISOString().split('T')[0];
    }

    static toDate(dateString: any) {
        if (typeof dateString === 'string') {
            const [day, month, year] = dateString.split('/').map(Number);
            return new Date(year, month - 1, day);
        }
        return dateString;
    }

    static getMonthAndYear(date: Date) {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${year}`;
    }

    static parseMonthAndYearToDate(date: string) {
        const day = 1;
        const month = date.split('/')[0];
        const year = date.split('/')[1];
        return new Date(Number.parseInt(year), Number.parseInt(month) - 1, day);
    }
}
