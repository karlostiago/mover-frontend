import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemMaintenanceEntity} from "../../../../../entity/ItemMaintenanceEntity";
import {AlertService} from "../../../../../shared/service/AlertService";
import {ConfirmationService} from "primeng/api";
import {NumberHelpers} from "../../../../../shared/helper/NumberHelpers";

@Component({
  selector: 'app-table-maintenance',
  templateUrl: './table-maintenance.component.html',
  styleUrls: ['./table-maintenance.component.css']
})
export class TableMaintenanceComponent implements OnInit {

    @Input() title: string;
    @Input() items = new Array<ItemMaintenanceEntity>();

    @Output() updateValue = new EventEmitter<void>();
    @Output() itemsChange = new EventEmitter<Array<ItemMaintenanceEntity>>();

    selectedItems = new Array<ItemMaintenanceEntity>();
    item: ItemMaintenanceEntity = new ItemMaintenanceEntity();
    totalizer: number = 0;

    private updating: boolean = false;

    constructor(private alertService: AlertService,
                private confirmationService: ConfirmationService,) { }

    ngOnInit(): void { }

    save() {
        if (!this.item.description) {
            this.alertService.error('Informe uma descrição');
            return;
        }

        if (this.updating) {
            this.updateItem();
        } else {
            this.addItem();
        }

        this.sortItems();
        this.clear();

        this.alertService.success(
            this.updating ? 'Registro atualizado com sucesso.' : 'Registro salvo com sucesso.'
        );
    }

    confirmationDelete() {
        if (this.selectedItems.length === 0) {
            this.alertService.info("Selecione ao menos 1 registro para remover.")
            return;
        }

        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir os item(s) selecionados ?`,
            accept: () => {
                this.delete();
            }
        });
    }

    update(item: ItemMaintenanceEntity) {
        this.item = structuredClone(item);
        this.updating = true;
    }

    clear(input?: HTMLInputElement) {
        this.item = new ItemMaintenanceEntity();
        this.updating = false;
        this.selectedItems = [];
        input?.focus();
    }

    onEnter(input: HTMLInputElement) {
        this.save();
        input.focus();
    }

    private delete() {
        const deleteIds = new Set(this.selectedItems.map(i => i.id));
        this.items = this.items.filter(item => !deleteIds.has(item.id))
        this.alertService.success('Registro(s) removido(s) com sucesso.');
        this.calculateTotal();
    }

    private addItem() {
        const newItem = { ...this.item, id: this.getNextId() }
        this.items.push(newItem);
        this.calculateTotal();
    }

    private updateItem() {
        const index = this.items.findIndex(item => item.id === this.item.id);
        if (index !== -1) {
            this.items[index] = {...this.item};
        }
        this.calculateTotal();
    }

    private sortItems() {
        this.items = this.items.sort((a, b) => a.id - b.id);
    }

    private getNextId() {
        return this.items.length
            ? Math.max(...this.items.map(i => i.id ?? 0)) + 1
            : 1;
    }

    private calculateTotal() {
        this.totalizer = this.items.reduce((sum, item) => {
            return sum + (item.value * item.quantity)
        }, 0);
        this.itemsChange.emit(this.items);
        this.updateValue.emit();
    }

    protected readonly NumberHelpers = NumberHelpers;
}
