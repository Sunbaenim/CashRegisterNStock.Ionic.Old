import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductIndexModel } from '../../../../core/models/product/product-index.model';

@Component({
  selector: 'app-product-update-modal',
  templateUrl: './product-update-modal.component.html',
  styleUrls: ['./product-update-modal.component.scss'],
})
export class ProductUpdateModalComponent implements OnInit {

  @Input() product: ProductIndexModel;

  constructor(
    public updateProductModalController: ModalController
  ) { }

  ngOnInit() {}

  dismiss() {
    this.updateProductModalController.dismiss();
  };

}
