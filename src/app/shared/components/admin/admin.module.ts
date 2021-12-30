import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductAddModalComponent } from './product-add-modal/product-add-modal.component';
import { ProductUpdateModalComponent } from './product-update-modal/product-update-modal.component';
import { ProductFormComponent } from './product-form/product-form.component';

@NgModule({
  declarations: [
    ProductAddModalComponent,
    ProductUpdateModalComponent,
    ProductFormComponent
  ],
  imports: [
  CommonModule,
    AdminRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
