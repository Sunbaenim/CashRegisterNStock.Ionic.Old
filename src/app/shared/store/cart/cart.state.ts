import { CartStateModel } from './cart.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddProduct, RemoveProduct, UpdateQuantity } from './cart.actions';
import { OrderLineService } from './../../../core/services/order-line.service';

@State<CartStateModel>({
  name: 'OrderLineIndexModel',
  defaults: {
      cart: []
  }
})

@Injectable()
export class CartState {

  constructor(
    private olService: OrderLineService
  ) {}

  @Selector()
  static cart(state: CartStateModel) {
      return state.cart;
  };

  @Action(AddProduct)
  addProduct(ctx: StateContext<CartStateModel>, action: AddProduct) {
      const state: CartStateModel = ctx.getState();
      const index = state.cart.findIndex(p => p.order.id === action.product.order.id && p.product.id === action.product.product.id);

      if (state.cart[index]) {
        state.cart[index].quantity += action.product.quantity;
        state.cart[index].price += action.product.price;
        ctx.setState({...state});
        this.olService.update({
          orderId: action.product.order.id,
          productId: action.product.product.id,
          quantity: state.cart[index].quantity,
          price: state.cart[index].price
        }).subscribe();
      }
      else {
        ctx.setState({cart: [...state.cart, action.product]});
        this.olService.create({
          orderId: action.product.order.id,
          productId: action.product.product.id,
          quantity: action.product.quantity,
          price: action.product.price
        }).subscribe();
      };
  };

  @Action(RemoveProduct)
  removeProduct(ctx: StateContext<CartStateModel>, action: RemoveProduct) {
    const state: CartStateModel = ctx.getState();
    const index = state.cart.findIndex(p => p.order.id === action.orderId && p.product.id === action.productId);
    state.cart.splice(index, 1);
    ctx.setState({ cart: [...state.cart] });
    this.olService.delete(action.orderId, action.productId).subscribe();
  };

  @Action(UpdateQuantity)
  updateQuantity(ctx: StateContext<CartStateModel>, action: UpdateQuantity) {
    const state: CartStateModel = ctx.getState();
    const index = state.cart.findIndex(p => p.order.id === action.product.order.id && p.product.id === action.product.product.id);
    state.cart[index].quantity = action.quantity;
    state.cart[index].price = action.product.product.price * action.quantity;
    ctx.setState({ cart: [...state.cart] });
    this.olService.update({
      orderId: action.product.order.id,
      productId: action.product.product.id,
      quantity: action.quantity,
      price: state.cart[index].price
    }).subscribe();
  };

}
