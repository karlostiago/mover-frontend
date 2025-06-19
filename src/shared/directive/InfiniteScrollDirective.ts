import {Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";

@Directive({
    selector: '[appIfiniteScroll]',
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {

    @Output() scrolled = new EventEmitter<void>();
    @Input() disabled = false;

    private observer!: IntersectionObserver;

    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.disabled) {
                    this.scrolled.emit();
                }
            });
        });
        this.observer.observe(this.el.nativeElement);
    }

    ngOnDestroy(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
