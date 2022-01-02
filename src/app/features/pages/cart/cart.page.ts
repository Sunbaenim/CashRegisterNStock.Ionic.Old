import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OrderLineIndexModel } from 'src/app/core/models/order-line/order-line-index.model';
import { RemoveProduct } from 'src/app/shared/store/cart/cart.actions';
import { CartState } from 'src/app/shared/store/cart/cart.state';
import { environment } from 'src/environments/environment';

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
    private store: Store
  ) { }

  ngOnInit() {
    this.cart$.subscribe(cart => this.cart = cart);
  }

  removeFromCart(orderId: number, productId: number) {
    console.log(orderId, productId);
    this.store.dispatch(new RemoveProduct(orderId, productId));
  };

}
