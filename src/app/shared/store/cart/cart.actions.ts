import { OrderLineIndexModel } from 'src/app/core/models/order-line/order-line-index.model';

export class AddProduct {
  static readonly type = '[CartState] Add Product';
  constructor(public product: OrderLineIndexModel) {}
};

export class RemoveProduct {
  static readonly type = '[CartState] Remove Product';
  constructor(public orderId: number, public productId: number) {}
};

export class UpdateQuantity {
  static readonly type = '[CartState] Update Quantity';
  constructor(public orderId: number, public productId: number, public quantity: number) {}
};
