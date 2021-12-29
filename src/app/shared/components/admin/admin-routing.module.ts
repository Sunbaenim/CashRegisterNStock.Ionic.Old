import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';

const routes: Routes = [{path: '', component: AddProductModalComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AdminRoutingModule { }
