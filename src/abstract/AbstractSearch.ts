import {InputField} from "../app/core/components/sidebar-details/sidebar-details.component";

export abstract class AbstractSearch {

    visibleSidebar: boolean = false;
    values: any[] = [];
    selectedValue: any = {};
    fields = new Array<InputField>()

    private updateFieldInterval: any;

    protected constructor() { }

    onRowSelect() {
        setTimeout(() => {
            this.visibleSidebar = true;
            if (this.selectedValue) {
                localStorage.setItem("VALUE_ID", String(this.selectedValue.id));
                this.loadingFields();
                this.hasChange();
            }
        }, 100);
    }

    onRowUnSelect(e: any) {
        this.selectedValue = e.data;
        this.onRowSelect();
    }

    closeSidebarDetails() {
        this.visibleSidebar = false;
        localStorage.removeItem("VALUE_ID");
        clearInterval(this.updateFieldInterval);
    }

    findAll(values: any[]) {
        const valueID = +localStorage.getItem("VALUE_ID")!;
        if (valueID) {
            this.selectedValue = values.find(v => v.id === valueID) ?? this.selectedValue;
            if (this.selectedValue) this.onRowSelect();
        }
        return values;
    }

    deleteById(id: number, values: any[]) {
        values = values.filter(v => v.id !== id);
        this.closeSidebarDetails();
        return values;
    }

    private hasChange() {
        this.updateFieldInterval = setInterval(() => {
            this.loadingFields();
        }, 500);
    }

    private loadingFields() {
        if (this.selectedValue) {
            this.createFieldsSidebarDetails();
        }
    }

    abstract createFieldsSidebarDetails(): void;
}
