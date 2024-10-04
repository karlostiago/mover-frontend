import {Directive, ElementRef, HostListener, Input} from "@angular/core";
import {AlertService} from "../../service/AlertService";

@Directive({
    selector: '[appNumberRange]'
})
export class NumberRangeDirective {

    @Input() minValue = 1;
    @Input() maxValue = 31;

    constructor(private el: ElementRef,
                private alertService: AlertService) { }

    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initialValue = this.el.nativeElement.value;
        this.el.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
        let currentValue = 0;
        if (this.el.nativeElement.value) {
            currentValue = parseInt(this.el.nativeElement.value, 10);
            if (currentValue > this.maxValue || currentValue === 0) {
                this.alertService.warning(`Valor ${currentValue}, inválido. Permitido apenas valores entre ${this.minValue} e ${this.maxValue}`);
                this.el.nativeElement.value = '';
            }
        }
        if (initialValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
