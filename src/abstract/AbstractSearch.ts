import {InputField} from "../app/core/components/sidebar-details/sidebar-details.component";

export abstract class AbstractSearch {

    visibleSidebar: boolean = false;
    values: any[] = [];
    selectedValue: any = {};
    fields = new Array<InputField>()

    protected constructor() { }

    onRowSelect() {
        setTimeout(() => {
            this.visibleSidebar = true;
            if (this.selectedValue) {
                localStorage.setItem("VALUE_ID", String(this.selectedValue.id));
                this.loadingFields();
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
    }

    findAll(values: any[]) {
        const valueID = localStorage.getItem("VALUE_ID");
        for (const value of values) {
            if (valueID && value.id === Number(valueID)) {
                this.selectedValue = value;
                this.onRowSelect();
                break;
            }
        }
        return values;
    }

    deleteById(id: number, values: any[]) {
        values = values.filter(v => v.id !== id);
        this.closeSidebarDetails();
        return values;
    }

    private loadingFields() {
        if (this.selectedValue) {
            this.createFieldsSidebarDetails();
        }
    }

    abstract createFieldsSidebarDetails(): void;
}
