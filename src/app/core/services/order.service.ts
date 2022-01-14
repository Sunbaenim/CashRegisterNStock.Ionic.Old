import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderAddModel } from '../models/order/order-add.model';
import { OrderIndexModel } from '../models/order/order-index.model';
import { OrderUpdateModel } from '../models/order/order-update.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderUrl: string = environment.apiUrl + 'order/';
  firstOrderId$: BehaviorSubject<number>;

  constructor(
    private client: HttpClient
  ) {
    this.firstOrderId$ = new BehaviorSubject<number>(null);
  }

  create(form: OrderAddModel) {
    return this.client.post(this.orderUrl, form);
  };

  read() {
    return this.client.get<[OrderIndexModel]>(this.orderUrl);
  };

  readFirst() {
    this.read().subscribe((data) => this.firstOrderId$.next(
      data.filter((o) => o.status.toString() === 'InProgress')
      .reduce((prev, curr) => prev.id < curr.id ? prev : curr).id
    ));

    return this.firstOrderId$.asObservable();
  }

  update(form: OrderUpdateModel) {
    return this.client.put<OrderUpdateModel>(this.orderUrl + form.id, form);
  };

}
