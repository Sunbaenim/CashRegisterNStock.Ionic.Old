import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalog',
    pathMatch: 'full'
  },
  {
    path: 'catalog',
    loadChildren: () => import('./features/pages/catalog/catalog.module').then( m => m.CatalogPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./features/pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./features/pages/login/login.module').then( m => m.LoginPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
