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
import { OrderIndexModel } from 'src/app/core/models/order/order-index.model';
import { OrderLineIndexModel } from 'src/app/core/models/order-line/order-line-index.model';
import { AddProduct } from 'src/app/shared/store/cart/cart.actions';
import { Select, Store } from '@ngxs/store';
import { CartState } from 'src/app/shared/store/cart/cart.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit, AfterViewInit {

  @ViewChild('catalogPage') page: ElementRef;
  @Select(CartState.cart) cart$!: Observable<OrderLineIndexModel[]>;

  catalog: CategoryIndexModel[];
  baseUrl: string = environment.baseUrl;

  userLevel: string;
  isModalOpen: boolean;

  cart: OrderLineIndexModel[];
  index: number;

  constructor(
    private pService: ProductService,
    public addProductModalController: ModalController,
    public productUpdateModalController: ModalController,
    public categoryUpdateModalComponent: ModalController,
    private gService: GestureService,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit() {
    this.getCatalog();
    this.cart$.subscribe(cart => this.cart = cart);
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
    modal.onDidDismiss().then(() => this.getCatalog());

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

  addToCart(product: ProductIndexModel) {
    const order: OrderIndexModel = {
      id: 1,
      status: 0
    };
    const po: OrderLineIndexModel = {
      order,
      product,
      price: product.price,
      quantity: 1
    };
    this.store.dispatch(new AddProduct(po));
  };

  existInCart(product: ProductIndexModel): boolean {
    this.index = this.cart.findIndex(p => p.product.id === product.id);
    if (this.index >= 0) {return true;}
    else {return false;}
  };

  getQuantity(): number {
    return this.index >= 0 ? this.cart[this.index].quantity : null;
  };

}
