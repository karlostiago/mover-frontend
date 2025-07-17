import {Component, Input, OnInit} from '@angular/core';
import {ItemMaintenanceEntity} from "../../../../../entity/ItemMaintenanceEntity";
import {AlertService} from "../../../../../shared/service/AlertService";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-table-maintenance',
  templateUrl: './table-maintenance.component.html',
  styleUrls: ['./table-maintenance.component.css']
})
export class TableMaintenanceComponent implements OnInit {

    @Input() title: string;
    @Input() items = new Array<ItemMaintenanceEntity>();

    selectedItems = new Array<ItemMaintenanceEntity>();
    item: ItemMaintenanceEntity = new ItemMaintenanceEntity();

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
            this.alertService.error("Selecione ao menos 1 registro para remover.")
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

    clear() {
        this.item = new ItemMaintenanceEntity();
        this.updating = false;
        this.selectedItems = [];
    }

    private delete() {
        const deleteIds = new Set(this.selectedItems.map(i => i.id));
        this.items = this.items.filter(item => !deleteIds.has(item.id))
        this.alertService.success('Registro(s) removido(s) com sucesso.');
    }

    private addItem() {
        const newItem = { ...this.item, id: this.getNextId() }
        this.items = [...this.items, newItem]
    }

    private updateItem() {
        this.items = this.items.filter(item => item.id !== this.item.id)
            .concat({...this.item});
    }

    private sortItems() {
        this.items = [...this.items].sort((a, b) => a.id - b.id);
    }

    private getNextId() {
        return this.items.length
            ? Math.max(...this.items.map(i => i.id ?? 0)) + 1
            : 1;
    }
}
