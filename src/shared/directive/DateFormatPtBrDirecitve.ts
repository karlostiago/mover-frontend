import {Directive, ElementRef, forwardRef, HostListener} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Directive({
    selector: '[appDateFormatPtBr]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DateFormatPtBrDirecitve),
        multi: true
    }]
})
export class DateFormatPtBrDirecitve {

    private onChange: (value: Date | null) => void;
    private onTouched: () => void;

    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event']) onInputChange(event: any) {
        let value = this.el.nativeElement.value;
        value = this.formatDate(value);
        this.el.nativeElement.value = value;
        this.emitDate(value);
    }

    @HostListener('blur', ['$event']) onBlur() {
        let value = this.el.nativeElement.value;
        this.el.nativeElement.value = this.formatDate(value);
        this.onTouched();
    }

    setDisabledState?(isDisabled: boolean): void {
        this.el.nativeElement.disabled = isDisabled;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    writeValue(value: any): void {
        if (value) {
            this.el.nativeElement.value = this.formatDate(value);
        } else {
            this.el.nativeElement.value = '';
        }
    }

    private formatDate(value: string): string {
        value = value.replace(/\D/g, '');

        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        if (value.length > 5) {
            value = value.substring(0, 5) + '/' + value.substring(5, 9);
        }

        return value;
    }

    private emitDate(value: string) {
        if (value.length === 10) { // Se o formato for dd/mm/yyyy
            const [day, month, year] = value.split('/');
            const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
            this.onChange(date);
        } else {
            this.onChange(null);
        }
    }
}