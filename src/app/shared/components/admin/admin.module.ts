import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductAddModalComponent } from './product-add-modal/product-add-modal.component';
import { ProductUpdateModalComponent } from './product-update-modal/product-update-modal.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { CategoryUpdateModalComponent } from './category-update-modal/category-update-modal.component';
import { CategoryFormComponent } from './category-form/category-form.component';

@NgModule({
  declarations: [
    ProductAddModalComponent,
    ProductUpdateModalComponent,
    ProductFormComponent,
    CategoryUpdateModalComponent,
    CategoryFormComponent
  ],
  imports: [
CommonModule,
    AdminRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
