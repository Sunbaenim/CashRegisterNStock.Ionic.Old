import { Component, OnChanges, OnInit, SimpleChanges, NgZone, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Status } from 'src/app/core/models/enums/status.enum';
import { OrderLineIndexModel } from 'src/app/core/models/order-line/order-line-index.model';
import { OrderService } from 'src/app/core/services/order.service';
import { LoadCart, RemoveProduct, UpdateQuantity } from 'src/app/shared/store/cart/cart.actions';
import { CartState } from 'src/app/shared/store/cart/cart.state';
import { environment } from 'src/environments/environment';
import { OrderUpdateModel } from './../../../core/models/order/order-update.model';
import { OrderIndexModel } from './../../../core/models/order/order-index.model';
import { OrderAddModel } from './../../../core/models/order/order-add.model';
import { ProductService } from 'src/app/core/services/product.service';
import { GestureService } from './../../../core/services/gesture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, AfterViewInit {

  @ViewChild('cartPage') page: ElementRef;
  @Select(CartState.cart) cart$!: Observable<OrderLineIndexModel[]>;

  cart: OrderLineIndexModel[];
  totalPrice: number;
  baseUrl: string = environment.baseUrl;
  amountPayback: number;
  amountFormGroup: FormGroup = this.formBuilder.group({});
  selectedCash: number;
  orders: OrderIndexModel[] = [];
  selectedOrder: number;
  firstOrderId: number;
  subscription: Subscription;

  constructor(
    private store: Store,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private oService: OrderService,
    private pService: ProductService,
    private ngZone: NgZone,
    private gService: GestureService,
    private router: Router
    ) { }

    ngOnInit() {
      this.getOrders();
      this.cart$.subscribe(cart => {
        this.cart = cart;
      });
      this.totalPrice = 0;
      this.getTotalPrice();
      this.amountPayback = 0;
      this.amountFormGroup = this.formBuilder.group({
      amount: 0
    });
    this.amountFormGroup.get('amount').valueChanges.subscribe((x) => {
      this.ngZone.run(() => this.amountPayback = x - this.totalPrice);
    });
  }

  ngAfterViewInit(): void {
    this.gService.createGesture(this.page, (detail) => {
      console.log(detail.deltaX);
      console.log(detail.currentX);
      if (detail.deltaX > 25 && detail.currentX < 100) {
        this.router.navigate(['/catalog']);
      }
    });
  }

  setSelectedOrder(order: OrderIndexModel) {
    this.oService.setSelectedOrder(order);
  }

  getTotalPrice() {
    this.cart.forEach((p) => this.totalPrice += p.price);
  };

  removeFromCart(orderId: number, productId: number) {
    new Promise((resolve) => resolve(this.store.dispatch(new RemoveProduct(orderId, productId))))
    .then(() => {
      this.cart$.subscribe(cart => this.cart = cart);
      this.totalPrice = 0;
      this.getTotalPrice();
    });
  };

  async presentAlert(product: OrderLineIndexModel) {
    const alert = await this.alertController.create({
      header: 'Modifier la quantité',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantité'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            this.alertController.dismiss();
          }
        },
        {
          text: 'Valider',
          handler: (quantity) => {
            this.store.dispatch(new UpdateQuantity(product, parseInt(quantity.quantity, 10)));
            this.alertController.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }

  getOrders() {
    this.orders = [];
    this.oService.read().subscribe((data) => {
      data.map((o) => {
        if (o.status.toString() === 'InProgress') {
          this.orders.push(o);
        }
      });
      this.oService.getSelectedOrder().subscribe((os) => {
        this.selectedOrder = os ? this.orders.findIndex((e) => e.id === os?.id) + 1 : 1;
      });
    });
  };

  addOrder() {
    const order: OrderAddModel = {
      status: Status.inProgress
    };
    this.oService.create(order).subscribe();
  };

  confirmPayment() {
    const order: OrderUpdateModel = {
      id: 1,
      status: Status.finished
    };
    this.oService.update(order).subscribe();

    this.cart.forEach(orderLine => {
      this.pService.decrementStock({id: orderLine.product.id, quantity: orderLine.quantity}).subscribe();
    });
  };

  loadCartFromOrder(order: OrderIndexModel) {
    this.store.dispatch(new LoadCart(order.id));
    this.setSelectedOrder(order);
  };

  async presentDeleteOrderAlert() {
    const alert = await this.alertController.create({
      header: 'Supprimer la commande',
      cssClass: 'delete-alert',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            this.alertController.dismiss();
          }
        },
        {
          text: 'Valider',
          handler: () => {
            this.deleteOrder();
            this.alertController.dismiss();
          }
        }
      ]
    });

    await alert.present();

    alert.onDidDismiss().then(() => {
      this.subscription.unsubscribe();
    });
  }

  deleteOrder() {
    this.subscription = this.oService.getSelectedOrder().subscribe(os => {
      this.oService.delete(os.id).subscribe(() => {
        this.orders = this.orders.filter(o => os.id !== o.id);
        if(this.orders.length) {
          this.loadCartFromOrder(this.orders[this.orders.length - 1]);
        }
        else {
          this.oService.create({status: Status.inProgress}).subscribe(() => this.getOrders());
        }
      });
    });
  }

}
