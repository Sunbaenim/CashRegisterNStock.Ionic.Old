import { Store } from '@ngxs/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { OrderService } from './core/services/order.service';
import { LoadCart } from './shared/store/cart/cart.actions';
import { Status } from './core/models/enums/status.enum';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private storage: Storage,
    private oService: OrderService
  ) {}

  ngOnInit(): void {
    this.storage.create();
    this.oService.readFirst().subscribe(o => {
      if (o) {
        this.store.dispatch(new LoadCart(o));
        this.oService.getById(o).subscribe((result) => this.oService.setSelectedOrder(result));
      }
    });
  }

  ngOnDestroy(): void {
    this.storage.remove('TOKEN');
  }

}
