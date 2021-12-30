import { Component, EventEmitter, OnInit } from '@angular/core';
import { ProductService } from './../../../core/services/product.service';
import { CategoryIndexModel } from './../../../core/models/category/category-index.model';
import { environment } from './../../../../environments/environment';
import { ModalController } from '@ionic/angular';
import { ProductAddModalComponent } from './../../../shared/components/admin/product-add-modal/product-add-modal.component';
import { ProductUpdateModalComponent } from '../../../shared/components/admin/product-update-modal/product-update-modal.component';
import { ProductIndexModel } from './../../../core/models/product/product-index.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

  catalog: CategoryIndexModel[];
  baseUrl: string = environment.baseUrl;

  userLevel: string;
  isModalOpen: boolean;

  constructor(
    private pService: ProductService,
    public addProductModalController: ModalController,
    public productUpdateModalController: ModalController
  ) { }

  ngOnInit() {
    this.getCatalog();
  }

  getCatalog() {
    this.pService.read().subscribe(data => this.catalog = data);
  };

  async presentProductAddModal() {
    const modal = await this.addProductModalController.create({
      component: ProductAddModalComponent
    });
    return await modal.present();
  }

  async presentUpdateProductModal(product: ProductIndexModel) {
    const modal = await this.productUpdateModalController.create({
      component: ProductUpdateModalComponent,
      componentProps: {product}
    });
    return await modal.present();
  }

}
