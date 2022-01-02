import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from './../../../core/services/product.service';
import { CategoryIndexModel } from './../../../core/models/category/category-index.model';
import { environment } from './../../../../environments/environment';
import { ModalController } from '@ionic/angular';
import { ProductAddModalComponent } from './../../../shared/components/admin/product-add-modal/product-add-modal.component';
import { ProductUpdateModalComponent } from '../../../shared/components/admin/product-update-modal/product-update-modal.component';
import { ProductIndexModel } from './../../../core/models/product/product-index.model';
import { CategoryUpdateModalComponent } from './../../../shared/components/admin/category-update-modal/category-update-modal.component';
import { CategoryIndexWithoutProductModel } from 'src/app/core/models/category/category-index-without-product.model';
import { GestureService } from './../../../core/services/gesture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit, AfterViewInit {

  @ViewChild('catalogPage') page: ElementRef;

  catalog: CategoryIndexModel[];
  baseUrl: string = environment.baseUrl;

  userLevel: string;
  isModalOpen: boolean;

  constructor(
    private pService: ProductService,
    public addProductModalController: ModalController,
    public productUpdateModalController: ModalController,
    public categoryUpdateModalComponent: ModalController,
    private gService: GestureService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCatalog();
  }

  ngAfterViewInit() {
    this.gService.createGesture(this.page, (detail) => {
      if (detail.deltaX < -50 && detail.currentX > 200) {
        this.router.navigate(['/cart']);
      }
    });
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

  async presentUpdateCategoryModal(category: CategoryIndexModel) {
    const modal = await this.categoryUpdateModalComponent.create({
      component: CategoryUpdateModalComponent,
      componentProps: {category}
    });
    return await modal.present();
  }

}
