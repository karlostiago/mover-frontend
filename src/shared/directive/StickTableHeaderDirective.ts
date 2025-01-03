import {AfterViewInit, Directive, ElementRef, Renderer2} from "@angular/core";

@Directive({
    selector: '[appStickTableHeader]'
})
export class StickTableHeader implements AfterViewInit {

    private headerElement: HTMLElement | null = null;
    private tableElement: HTMLElement | null = null;
    private headerOriginalPosition: number | null = null;
    private isStickyApplied = false;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit(): void {
        this.initializeHeaderAndTable();
        this.monitorScroll();
    }

    private initializeHeaderAndTable(): void {
        const tableRoot = this.el.nativeElement;
        this.tableElement = tableRoot.querySelector('table');
        // @ts-ignore
        this.headerElement = this.tableElement?.querySelector('thead');

        if (!this.headerElement || !this.tableElement) {
            console.error('appStickTableHeader: Não foi possível localizar <table> ou <thead>.');
        }
    }

    private monitorScroll(): void {
        window.addEventListener('scroll', () => this.onWindowScroll());
        this.observeScrollChanges();
    }

    private observeScrollChanges(): void {
        const checkStickyState = () => {
            this.onWindowScroll();
            requestAnimationFrame(checkStickyState);
        };
        requestAnimationFrame(checkStickyState);
    }

    private onWindowScroll(): void {
        if (!this.headerElement || !this.tableElement) {
            return;
        }

        const tableRect = this.tableElement.getBoundingClientRect();
        const headerRect = this.headerElement.getBoundingClientRect();

        if (this.headerOriginalPosition === null) {
            this.headerOriginalPosition = tableRect.top;
        }

        if (tableRect.top <= 0 && headerRect.bottom >= 0 && !this.isStickyApplied) {
            this.makeHeaderSticky();
        } else if (tableRect.top > 44 && this.isStickyApplied) {
            this.resetHeader();
        }
    }

    private makeHeaderSticky(): void {
        if (!this.headerElement || !this.tableElement) {
            return;
        }

        this.isStickyApplied = true;

        const columnWidths = Array.from(this.tableElement.querySelectorAll('thead th')).map(
            // @ts-ignore
            (th: HTMLElement) => th.offsetWidth
        );

        const columnAlignments = Array.from(this.tableElement.querySelectorAll('thead th')).map(
            // @ts-ignore
            (th: HTMLElement) => ({
                textAlign: window.getComputedStyle(th).textAlign,
                verticalAlign: window.getComputedStyle(th).verticalAlign,
            })
        );

        const headerOffset = Math.max(this.tableElement.getBoundingClientRect().top, 44);

        this.renderer.setStyle(this.headerElement, 'position', 'fixed');
        this.renderer.setStyle(this.headerElement, 'top', `${headerOffset}px`);
        this.renderer.setStyle(this.headerElement, 'z-index', '1000');
        this.renderer.setStyle(this.headerElement, 'background', '#fff');
        this.renderer.setStyle(this.headerElement, 'display', 'table');
        this.renderer.setStyle(this.headerElement, 'width', `${this.tableElement.offsetWidth}px`);

        const headerColumns = this.headerElement.querySelectorAll('th');
        headerColumns.forEach((th: HTMLElement, index: number) => {
            const width = index === 1 ? columnWidths[index] + 44 : columnWidths[index] ;
            this.renderer.setStyle(th, 'width', `${width}px`);
        });
    }

    private resetHeader(): void {
        if (!this.headerElement) {
            return;
        }

        this.isStickyApplied = false;

        this.renderer.removeStyle(this.headerElement, 'position');
        this.renderer.removeStyle(this.headerElement, 'top');
        this.renderer.removeStyle(this.headerElement, 'z-index');
        this.renderer.removeStyle(this.headerElement, 'background');
        this.renderer.removeStyle(this.headerElement, 'display');
        this.renderer.removeStyle(this.headerElement, 'width');

        const headerColumns = this.headerElement.querySelectorAll('th');
        headerColumns.forEach((th: HTMLElement) => {
            this.renderer.removeStyle(th, 'width');
            this.renderer.removeStyle(th, 'text-align');
            this.renderer.removeStyle(th, 'vertical-align');
        });
    }
}
