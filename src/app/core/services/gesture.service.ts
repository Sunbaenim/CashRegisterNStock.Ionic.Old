import { ElementRef, Injectable } from '@angular/core';
import { GestureController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GestureService {

  constructor(
    private gestureCtrl: GestureController
  ) { }

  createGesture(el: ElementRef, callback: (detail) => void) {
    const gesture = this.gestureCtrl.create({
      el: el.nativeElement,
      onMove: (detail) => {callback(detail);},
      gestureName: 'myGesture'
    });

    gesture.enable();
  };
}
