import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {BrandService} from "../brand.service";
import {AlertService} from "../../../../service/AlertService";
import {BrandEntity} from "../../../../entity/BrandEntity";
import {Table} from "primeng/table";

@Component({
  selector: 'app-search-brand',
  templateUrl: './search-brand.component.html',
  styleUrls: ['./search-brand.component.css']
})
export class SearchBrandComponent implements OnInit {

    brands = new Array<BrandEntity>();

    filterName: string = "";

    @ViewChild("table") table: Table | undefined;

    constructor(private confirmationService: ConfirmationService,
                private brandService: BrandService,
                private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.brandService.findAll().then(response => {
            this.brands = response;
        });
    }

    confirmationDelete(brand: BrandEntity) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir a marca ${brand['name']}?`,
            accept: () => {
                this.delete(brand.id);
            }
        })
    }

    delete(id: number) {
        this.brandService.delete(id).then(() => {
            this.brands = this.brands.filter(b => b.id !== id);
            this.alertService.success("Registro deletado com sucesso.");
        });
    }

    filterBy() {
        this.brandService.findByName(this.filterName).then(response => {
            this.brands = response;
            this.table?.reset();
        });
    }
}
