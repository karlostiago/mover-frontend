import {AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Renderer2} from "@angular/core";

@Directive({
    selector: '[appStickTableHeader]'
})
export class StickTableHeader implements AfterViewInit {

    private headerElement: HTMLElement | null = null;
    private tableElement: HTMLElement | null = null;
    private headerOriginalPosition: number | null = null;
    private isStickyApplied = false;

    private initialWidths: number[] = [];
    private isIncremented: boolean = false;
    private top: number = 60;

    constructor(private el: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this.initializeHeaderAndTable();
        this.cdr.detectChanges();
        setTimeout(() => this.adjustColumnWiths(), 200);
        this.monitorScroll();
    }

    private adjustColumnWiths() {
        if (!this.tableElement || !this.headerElement) return;

        this.loadingInitialWidths();

        this.renderer.setStyle(this.headerElement, 'width', `${this.tableElement.offsetWidth}px`);

        const headerColumns = this.headerElement.querySelectorAll('th');
        headerColumns.forEach((th: HTMLElement, index: number) => {
            const width = index === 1 ? this.initialWidths[index] + this.top : this.initialWidths[index];
            this.renderer.setStyle(th, 'width', `${width}px`);
        });
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

    private loadingInitialWidths() {
        if (!this.tableElement) return;

        // Captura as larguras iniciais apenas uma vez
        if (this.initialWidths.length === 0) {
            this.initialWidths = Array.from(this.tableElement.querySelectorAll('thead th')).map(
                // @ts-ignore
                (th: HTMLElement) => th.offsetWidth
            );
        }
    }

    private makeHeaderSticky(): void {
        if (!this.headerElement || !this.tableElement) {
            return;
        }

        this.isStickyApplied = true;

        this.loadingInitialWidths();

        const headerOffset = Math.max(this.tableElement.getBoundingClientRect().top, this.top);

        // Ajusta o cabeçalho
        this.renderer.setStyle(this.headerElement, 'position', 'fixed');
        this.renderer.setStyle(this.headerElement, 'top', `${headerOffset}px`);
        this.renderer.setStyle(this.headerElement, 'z-index', '1');
        this.renderer.setStyle(this.headerElement, 'background', '#fff');
        this.renderer.setStyle(this.headerElement, 'display', 'table');
        this.renderer.setStyle(this.headerElement, 'width', `${this.tableElement.offsetWidth}px`);

        const headerColumns = this.headerElement.querySelectorAll('th');
        headerColumns.forEach((th: HTMLElement, index: number) => {
            const width = this.isIncremented && index === 1 ? this.initialWidths[index] + this.top : this.initialWidths[index];
            this.renderer.setStyle(th, 'width', `${width}px`);
        });

        // Ajusta as colunas do corpo da tabela
        const bodyRows = this.tableElement.querySelectorAll('tbody tr');
        // @ts-ignore
        bodyRows.forEach((row: HTMLTableRowElement) => {
            const bodyColumns = row.querySelectorAll('td');
            bodyColumns.forEach((td: HTMLElement, index: number) => {
                const width = this.isIncremented && index === 1 ? this.initialWidths[index] + this.top : this.initialWidths[index];
                this.renderer.setStyle(td, 'width', `${width}px`);
            });
        });

        // Controle do incremento com base no scroll
        const scrollPosition = window.scrollY;
        if (scrollPosition > 0 && !this.isIncremented) {
            this.isIncremented = true;
            this.makeHeaderSticky();
        } else if (scrollPosition === 0 && this.isIncremented) {
            this.isIncremented = false;
            this.makeHeaderSticky();
        }
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

        const headerColumns = this.headerElement.querySelectorAll('th');
        headerColumns.forEach((th: HTMLElement) => {
            this.renderer.removeStyle(th, 'text-align');
            this.renderer.removeStyle(th, 'vertical-align');
        });
    }
}
