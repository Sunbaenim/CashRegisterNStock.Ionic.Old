import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OrderLineIndexModel } from 'src/app/core/models/order-line/order-line-index.model';
import { RemoveProduct, UpdateQuantity } from 'src/app/shared/store/cart/cart.actions';
import { CartState } from 'src/app/shared/store/cart/cart.state';
import { environment } from 'src/environments/environment';
import { OrderLineService } from './../../../core/services/order-line.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  @Select(CartState.cart) cart$!: Observable<OrderLineIndexModel[]>;

  cart: OrderLineIndexModel[];
  totalPrice: number;
  baseUrl: string = environment.baseUrl;
  amountPayback: number;
  amountFormGroup: FormGroup = this.formBuilder.group({});

  constructor(
    private store: Store,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private olService: OrderLineService
  ) { }

  ngOnInit() {
    this.cart$.subscribe(cart => this.cart = cart);
    this.totalPrice = 0;
    this.cart.forEach((p) => this.totalPrice += p.price);
    this.amountPayback = 0;
    this.amountFormGroup = this.formBuilder.group({
      amount: 0
    });
    this.amountFormGroup.get('amount').valueChanges.subscribe((x) => {
      this.amountPayback = x - this.totalPrice;
      console.log(this.amountPayback);
    });
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
            this.store.dispatch(new UpdateQuantity(product, quantity.quantity));
            this.alertController.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }

  confirmPayment() {
    console.log('Paiement confirmé');
  };

}
