import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { CategoryService } from 'src/app/core/services/category.service';
import { OrderService } from './core/services/order.service';
import { LoadCart } from './shared/store/cart/cart.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private categoryService: CategoryService,
    private store: Store,
    private oService: OrderService
  ) {
      this.oService.readFirst().subscribe(o => this.store.dispatch(new LoadCart(o)));
    }
}
