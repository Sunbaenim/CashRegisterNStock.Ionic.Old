import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OrderLineIndexModel } from 'src/app/core/models/order-line/order-line-index.model';
import { RemoveProduct } from 'src/app/shared/store/cart/cart.actions';
import { CartState } from 'src/app/shared/store/cart/cart.state';
import { environment } from 'src/environments/environment';
import { UpdateQuantity } from './../../../shared/store/cart/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  @Select(CartState.cart) cart$!: Observable<OrderLineIndexModel[]>;

  cart: OrderLineIndexModel[];
  baseUrl: string = environment.baseUrl;

  constructor(
    private store: Store,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.cart$.subscribe(cart => this.cart = cart);
  }

  removeFromCart(orderId: number, productId: number) {
    console.log(orderId, productId);
    this.store.dispatch(new RemoveProduct(orderId, productId));
  };

  async presentAlert(product: OrderLineIndexModel) {
    const alert = await this.alertController.create({
      header: 'Modifier la quantité',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantité'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            this.alertController.dismiss();
          }
        },
        {
          text: 'Valider',
          handler: (quantity) => {
            this.store.dispatch(new UpdateQuantity(product.order.id, product.product.id, quantity.quantity));
            this.alertController.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }

  updateQuantity(orderId: number, productId: number) {
    const quantity = 1;
    this.store.dispatch(new UpdateQuantity(orderId, productId, quantity));
  };

}
