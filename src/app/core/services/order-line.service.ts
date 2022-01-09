import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderLineAddModel } from '../models/order-line/order-line-add.model';
import { OrderLineIndexModel } from '../models/order-line/order-line-index.model';

@Injectable({
  providedIn: 'root'
})
export class OrderLineService {

  orderLineUrl: string = environment.apiUrl + 'orderline/';

  constructor(
    private client: HttpClient
  ) { }

  create(form: OrderLineAddModel) {
    return this.client.post<OrderLineAddModel>(this.orderLineUrl, form);
  };

  read() {
    return this.client.get<[OrderLineIndexModel]>(this.orderLineUrl);
  };

  update(form: OrderLineAddModel) {
    return this.client.put<OrderLineAddModel>(this.orderLineUrl, form);
  };

  delete(orderId: number, productId: number) {
    return this.client.delete(this.orderLineUrl + orderId + ', ' + productId);
  };

}
