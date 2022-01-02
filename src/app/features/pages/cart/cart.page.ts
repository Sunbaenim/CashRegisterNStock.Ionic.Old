import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OrderLineIndexModel } from 'src/app/core/models/order-line/order-line-index.model';
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

  constructor() { }

  ngOnInit() {
    this.cart$.subscribe(cart => this.cart = cart);
  }

}
