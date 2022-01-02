import { OrderIndexModel } from '../order/order-index.model';
import { ProductIndexModel } from '../product/product-index.model';

export interface OrderLineIndexModel {
    order: OrderIndexModel;
    product: ProductIndexModel;
    quantity: number;
    price: number;
};
