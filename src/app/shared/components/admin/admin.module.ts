import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AdminRoutingModule } from './admin-routing.module';

import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';

@NgModule({
  declarations: [
    AddProductModalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IonicModule
  ],
  exports: [
    AddProductModalComponent
  ]
})
export class AdminModule { }
