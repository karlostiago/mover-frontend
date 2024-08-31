import {Directive, ElementRef, forwardRef, HostListener, Renderer2} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Directive({
    selector: '[appMaskCpf]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MaskCpfDirective),
        multi: true
    }]
})
export class MaskCpfDirective {
    onChange = (value: string) => {};
    onTouched = () => {};

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('input', ['$event.target.value']) onInput(value: string): void {
        const cleanValue = this.cleanValue(value);
        const maskedValue = this.applyMask(cleanValue);
        this.renderer.setProperty(this.el.nativeElement, 'value', maskedValue);
        this.onChange(cleanValue);
    }

    @HostListener('blur')
    onBlur(): void {
        this.onTouched();
    }

    writeValue(value: string): void {
        const cleanValue = this.cleanValue(value);
        const maskedValue = this.applyMask(cleanValue);
        this.renderer.setProperty(this.el.nativeElement, 'value', maskedValue);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    private applyMask(value: string): string {
        if (!value) {
            return '';
        }

        value = value.replace(/\D/g, '');

        if (value.length > 3) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
        }
        if (value.length > 6) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
        }
        if (value.length > 9) {
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }
        return value;
    }

    private cleanValue(value: string): string {
        return value.replace(/\D/g, '');
    }
}
