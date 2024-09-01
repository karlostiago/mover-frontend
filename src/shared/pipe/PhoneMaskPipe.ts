import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneMask'
})
export class PhoneMaskPipe implements PipeTransform {

    transform(value: string | number): string {
        let phone = value.toString();

        phone = phone.replace(/\D/g, '');

        if (phone.length === 10) {
            return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else if (phone.length === 11) {
            return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else {
            return value.toString();
        }
    }
}
