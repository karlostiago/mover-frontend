export class DateHelpers {

    static toUTC(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    static parseToPtBr(dateStr: string) {
        return this.format(dateStr, 'pt-BR');
    }

    static parseToUS(dateStr: string) {
       return this.format(dateStr, 'US');
    }

    static toISOToString(date: Date) {
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

    static formatLongDate(date: Date, showDay: boolean): string {
        const day = date.getDate();
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        if (showDay) return `${day} de ${month} de ${year}`;

        return `${month} de ${year}`;
    }


    private static format(dateStr: string | Date, format: 'pt-BR' | 'US') {

        if (!dateStr) return '';

        let date: Date;

        if (dateStr instanceof Date) {
            date = dateStr;
        } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
            const [day, month, year] = dateStr.split('/').map(Number);
            date = new Date(year, month - 1, day);
        } else {
            date = new Date(dateStr);
        }

        if (isNaN(date.getTime())) return '';

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return format === 'pt-BR' ? `${day}/${month}/${year}` : `${year}-${month}-${day}`;
    }
}
