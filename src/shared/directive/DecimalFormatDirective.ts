import {Directive, ElementRef, forwardRef, HostListener} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Directive({
    selector: '[appDecimalFormat]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DecimalFormatDirective),
        multi: true
    }]
})
export class DecimalFormatDirective {
    private onChange: (value: number | null) => void = () => {};
    private onTouched: () => void = () => {};

    constructor(private elementRef: ElementRef) { }

    @HostListener('input', ['$event'])
    onInputChange(event: any): void {
        let value = this.elementRef.nativeElement.value;
        value = value.replace(/[^0-9]/g, '');
        if (value) {
            const numericValue = parseFloat(value);
            this.onChange(numericValue);
            this.elementRef.nativeElement.value = this.formatNumber(value);
        } else {
            this.onChange(null);
            this.elementRef.nativeElement.value = '';
        }
    }

    @HostListener('blur')
    onBlur(): void {
        this.onTouched();
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            const stringValue = value.toString();
            this.elementRef.nativeElement.value = this.formatNumber(stringValue);
        } else {
            this.elementRef.nativeElement.value = '';
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.elementRef.nativeElement.disabled = isDisabled;
    }

    private formatNumber(value: string): string {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
}
