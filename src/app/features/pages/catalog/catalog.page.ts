import { Component, EventEmitter, OnInit } from '@angular/core';
import { ProductService } from './../../../core/services/product.service';
import { CategoryIndexModel } from './../../../core/models/category/category-index.model';
import { environment } from './../../../../environments/environment';
import { ModalController } from '@ionic/angular';
import { AddProductModalComponent } from './../../../shared/components/admin/add-product-modal/add-product-modal.component';

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
    public addProductModalController: ModalController
  ) { }

  ngOnInit() {
    this.getCatalog();
  }

  getCatalog() {
    this.pService.read().subscribe(data => this.catalog = data);
  };

  async presentModal() {
    const modal = await this.addProductModalController.create({
      component: AddProductModalComponent
    });
    return await modal.present();
  }

}
