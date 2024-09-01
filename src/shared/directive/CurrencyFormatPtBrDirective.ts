import {Directive, ElementRef, forwardRef, HostListener} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Directive({
    selector: '[appCurrencyFormatPtBr]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CurrencyFormatPtBrDirective),
        multi: true
    }]
})
export class CurrencyFormatPtBrDirective {
    private onChange: (value: number | null) => void = () => {};
    private onTouched: () => void;

    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event']) onInputChange(event: any) {
        let value = this.el.nativeElement.value;
        value = value.replace(/[^0-9]/g, '');

        if (value.length > 2) {
            value = value.slice(0, value.length - 2) + ',' + value.slice(value.length - 2);
        } else if (value.length === 2) {
            value = '0,' + value;
        } else if (value.length === 1) {
            value = '0,0' + value;
        }

        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        this.el.nativeElement.value = value;
        const numericValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));
        this.onChange(numericValue);
    }

    @HostListener('blur', ['$event']) onBlur() {
        this.onTouched();
    }

    @HostListener('focus', ['$event']) onFocus() {
        let value = this.el.nativeElement.value;
        if (value === '0,00') {
            this.el.nativeElement.value = '';
        }
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            let stringValue = value.toFixed(2).replace('.', ',');
            stringValue = stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            this.el.nativeElement.value = `${stringValue}`;
        } else {
            this.el.nativeElement.value = '';
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.el.nativeElement.disabled = isDisabled;
    }
}
