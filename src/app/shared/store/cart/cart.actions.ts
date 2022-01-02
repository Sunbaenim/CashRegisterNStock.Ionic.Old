import { OrderLineIndexModel } from 'src/app/core/models/order-line/order-line-index.model';

export class AddProduct {
  static readonly type = '[CartState] Add Product';
  constructor(public product: OrderLineIndexModel) {}
};
