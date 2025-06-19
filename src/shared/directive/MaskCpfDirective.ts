import {Directive, ElementRef, forwardRef, HostListener, Renderer2} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {MaskHelpers} from "../helper/MaskHelpers";

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

    private readonly maxLength: number = 14;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('input', ['$event.target.value']) onInput(value: string): void {
        value = this.checkMaxLength(value);
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

    private checkMaxLength(value: string) {
        if (value.length > this.maxLength) {
            value = value.substring(0, this.maxLength);
        }
        return value;
    }

    private applyMask(value: string): string {
        return MaskHelpers.maskCpf(value);
    }

    private cleanValue(value: string): string {
        if (value) {
            value = value.replace(/\D/g, '');
        }
        return value;
    }
}
