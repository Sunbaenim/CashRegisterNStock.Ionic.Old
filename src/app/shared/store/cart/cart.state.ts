import { CartStateModel } from './cart.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddProduct } from './cart.actions';

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
          ctx.setState({...state});
      }
      else {ctx.setState({cart: [...state.cart, action.product]});};
  };

}
