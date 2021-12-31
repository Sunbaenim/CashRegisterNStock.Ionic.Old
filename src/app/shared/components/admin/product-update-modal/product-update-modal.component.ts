import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductIndexModel } from '../../../../core/models/product/product-index.model';
import { ProductService } from 'src/app/core/services/product.service';
import { DeleteModalComponent } from './../delete-modal/delete-modal.component';

@Component({
  selector: 'app-product-update-modal',
  templateUrl: './product-update-modal.component.html',
  styleUrls: ['./product-update-modal.component.scss'],
})
export class ProductUpdateModalComponent implements OnInit {

  @Input() product: ProductIndexModel;

  constructor(
    public updateProductModalController: ModalController,
    public deleteModalController: ModalController
  ) { }

  ngOnInit() {}

  dismiss() {
    this.updateProductModalController.dismiss();
  };

  async presentDeleteModal(product: ProductIndexModel) {
    const modal = await this.deleteModalController.create({
      component: DeleteModalComponent,
      componentProps: {product},
      cssClass: 'delete-modal'
    });
    return await modal.present();
  }

}
