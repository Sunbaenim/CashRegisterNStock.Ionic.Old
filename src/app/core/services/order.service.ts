import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderAddModel } from '../models/order/order-add.model';
import { OrderIndexModel } from '../models/order/order-index.model';
import { OrderUpdateModel } from '../models/order/order-update.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderUrl: string = environment.apiUrl + 'order/';

  constructor(
    private client: HttpClient
  ) { }

  create(form: OrderAddModel) {
    return this.client.post(this.orderUrl, form);
  };

  read() {
    return this.client.get<[OrderIndexModel]>(this.orderUrl);
  };

  update(form: OrderUpdateModel) {
    return this.client.put<OrderUpdateModel>(this.orderUrl + form.id, form);
  };

}
