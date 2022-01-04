import { Directive, ElementRef, HostListener, Input, NgZone } from '@angular/core';
import { AlertController, GestureController, GestureDetail } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { ProductIndexModel } from './../../core/models/product/product-index.model';
import { AddProduct } from './../store/cart/cart.actions';
import { OrderLineIndexModel } from './../../core/models/order-line/order-line-index.model';
import { Status } from 'src/app/core/models/enums/status.enum';

@Directive({
  selector: '[appPress]'
})
export class PressDirective {

  @Input('appPress') product: ProductIndexModel;

  longPressActive: boolean;

  constructor(
    private gestureCtrl: GestureController,
    private alertController: AlertController,
    private el: ElementRef,
    private zone: NgZone,
    private store: Store
    ) {
      this.createPressGesture();
    }

    createPressGesture() {
    const gesture = this.gestureCtrl.create({
      el: this.el.nativeElement,
      gestureName: 'press',
      threshold: 0,
      onStart: (ev) => {
        this.longPressActive = true;
        this.onStart(ev);
      },
      onEnd: () => {
        this.longPressActive = false;
      }
    });

    gesture.enable();
  };

  onStart(ev: GestureDetail) {
    const interval = setTimeout(() => {
      if (this.longPressActive) {
        this.longPressActive = false;
        this.presentAlertQuantity();
        clearInterval(interval);
      }
    }, 500);
  }

  async presentAlertQuantity() {
    const alert = await this.alertController.create({
      header: 'Ajouter',
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
            const ol: OrderLineIndexModel = {
              order: {id: 1, status: Status.inProgress},
              product: this.product,
              quantity: quantity.quantity,
              price: this.product.price
            };
            this.store.dispatch(new AddProduct(ol));
            this.alertController.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }


}
