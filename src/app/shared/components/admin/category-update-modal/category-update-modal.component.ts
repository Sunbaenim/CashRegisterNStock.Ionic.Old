import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryIndexWithoutProductModel } from 'src/app/core/models/category/category-index-without-product.model';

@Component({
  selector: 'app-category-update-modal',
  templateUrl: './category-update-modal.component.html',
  styleUrls: ['./category-update-modal.component.scss'],
})
export class CategoryUpdateModalComponent implements OnInit {

  @Input() category: CategoryIndexWithoutProductModel;

  constructor(
    public categoryUpdateModalController: ModalController
  ) { }

  ngOnInit() {}

  dismiss() {
    this.categoryUpdateModalController.dismiss();
  };

}
