import { Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-add-modal',
  templateUrl: './product-add-modal.component.html',
  styleUrls: ['./product-add-modal.component.scss'],
})
export class ProductAddModalComponent implements OnInit {

  choices: string[] = ['Produit', 'Catégorie'];
  multipleAddStyle: string;

  constructor(
    public addProductModalController: ModalController
  ) { }

  ngOnInit() {
    this.multipleAddStyle = 'unchecked';
  }

  dismiss() {
    this.addProductModalController.dismiss();
  };

  changeStyle() {
    if (this.multipleAddStyle === 'unchecked') {
      this.multipleAddStyle = 'checked';
    }
    else {
      this.multipleAddStyle = 'unchecked';
    }
  };

}
