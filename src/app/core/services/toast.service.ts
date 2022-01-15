import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController
  ) { }

  async presentToast(messageDisplay: string) {
    const toast = await this.toastController.create({
      message: messageDisplay,
      duration: 2000,
      cssClass: 'toast',
      icon: 'checkmark-sharp',
      color: 'dark'
    });
    toast.present();
  }

  async presentToastError(messageDisplay: string) {
    const toast = await this.toastController.create({
      message: messageDisplay,
      duration: 2000,
      cssClass: 'toast',
      icon: 'checkmark-sharp',
      color: 'danger'
    });
    toast.present();
  }

  async customToast(messageDisplay: string, color: string, duration: number, position: 'top' | 'bottom' | 'middle') {
    const toast = await this.toastController.create({
      message: messageDisplay,
      duration,
      cssClass: 'custom-toast',
      icon: 'checkmark-sharp',
      color,
      position
    });
    toast.present();
  }
}
