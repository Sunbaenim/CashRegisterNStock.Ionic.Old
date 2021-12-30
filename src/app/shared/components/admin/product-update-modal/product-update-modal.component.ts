import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductIndexModel } from '../../../../core/models/product/product-index.model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-update-modal',
  templateUrl: './product-update-modal.component.html',
  styleUrls: ['./product-update-modal.component.scss'],
})
export class ProductUpdateModalComponent implements OnInit {

  @Input() product: ProductIndexModel;

  constructor(
    public updateProductModalController: ModalController,
    private pService: ProductService
  ) { }

  ngOnInit() {}

  dismiss() {
    this.updateProductModalController.dismiss();
  };

  deleteProduct(id: number) {
    this.pService.delete(id).subscribe();
  };

}
