import { CartStateModel } from './cart.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddProduct, RemoveProduct, UpdateQuantity } from './cart.actions';

@State<CartStateModel>({
  name: 'OrderLineIndexModel',
  defaults: {
      cart: []
  }
})

@Injectable()
export class CartState {

  constructor() {}

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
          state.cart[index].price += action.product.product.price;
          ctx.setState({...state});
      }
      else {ctx.setState({cart: [...state.cart, action.product]});};
  };

  @Action(RemoveProduct)
  removeProduct(ctx: StateContext<CartStateModel>, action: RemoveProduct) {
    const state: CartStateModel = ctx.getState();
    console.log(state);
    const index = state.cart.findIndex(p => p.order.id === action.orderId && p.product.id === action.productId);
    console.log(index);
    state.cart.splice(index, 1);
    ctx.setState({ cart: [...state.cart] });
  };

  @Action(UpdateQuantity)
  updateQuantity(ctx: StateContext<CartStateModel>, action: UpdateQuantity) {
    const state: CartStateModel = ctx.getState();
    const index = state.cart.findIndex(p => p.order.id === action.product.order.id && p.product.id === action.product.product.id);
    state.cart[index].quantity = action.quantity;
    state.cart[index].price = action.product.product.price * action.quantity;
    ctx.setState({ cart: [...state.cart] });
  };

}
