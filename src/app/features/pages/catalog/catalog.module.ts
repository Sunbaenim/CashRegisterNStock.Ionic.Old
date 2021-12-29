import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogPageRoutingModule } from './catalog-routing.module';

import { CatalogPage } from './catalog.page';
import { AdminModule } from './../../../shared/components/admin/admin.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CatalogPageRoutingModule,
    AdminModule
  ],
  declarations: [CatalogPage]
})
export class CatalogPageModule {}
