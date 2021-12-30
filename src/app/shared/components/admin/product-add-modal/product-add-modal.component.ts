import { Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-add-modal',
  templateUrl: './product-add-modal.component.html',
  styleUrls: ['./product-add-modal.component.scss'],
})
export class ProductAddModalComponent implements OnInit {

  choices: string[] = ['Produit', 'Catégorie'];

  constructor(
    public addProductModalController: ModalController
  ) { }

  ngOnInit() {}

  dismiss() {
    this.addProductModalController.dismiss();
  };

}
