import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { CategoryIndexModel } from './../../../../core/models/category/category-index.model';
import { CategoryDeleteModel } from './../../../../core/models/category/category-delete.model';

@Component({
  selector: 'app-category-update-modal',
  templateUrl: './category-update-modal.component.html',
  styleUrls: ['./category-update-modal.component.scss'],
})
export class CategoryUpdateModalComponent implements OnInit {

  @Input() category: CategoryIndexModel;

  constructor(
    public categoryUpdateModalController: ModalController,
    public deleteModalController: ModalController
  ) { }

  ngOnInit() {}

  dismiss() {
    this.categoryUpdateModalController.dismiss();
  };

  async presentDeleteModal() {
    const category: CategoryDeleteModel = {
      id: this.category.id,
      name: this.category.name,
      nbProducts: this.category.products.length
    };

    const modal = await this.deleteModalController.create({
      component: DeleteModalComponent,
      componentProps: {category},
      cssClass: 'delete-modal'
    });
    return await modal.present();
  }

}
