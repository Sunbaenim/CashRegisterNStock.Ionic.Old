import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductIndexModel } from 'src/app/core/models/product/product-index.model';
import { ProductService } from 'src/app/core/services/product.service';
import { CategoryDeleteModel } from './../../../../core/models/category/category-delete.model';
import { CategoryService } from './../../../../core/services/category.service';

@Component({
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  @Input() product: ProductIndexModel;
  @Input() category: CategoryDeleteModel;

  constructor(
    public deleteModalController: ModalController,
    public productUpdateModalController: ModalController,
    public categoryUpdateModalController: ModalController,
    private pService: ProductService,
    private cService: CategoryService
  ) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.deleteModalController.dismiss();
  };

  deleteProduct(id: number) {
    this.pService.delete(id).subscribe();
    this.deleteModalController.dismiss().then(() => this.productUpdateModalController.dismiss());
  };

  deleteCategory(id: number) {
    this.cService.delete(id).subscribe();
    this.deleteModalController.dismiss().then(() => this.categoryUpdateModalController.dismiss());
  };

}
