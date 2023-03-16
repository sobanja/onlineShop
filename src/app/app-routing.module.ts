import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseComponent } from './components/base/base.component';
import { BasketComponent } from './components/basket/basket.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductResolver } from './services/product.resolver';

const routes: Routes = [
  {path: '', component: BaseComponent},
  {path: 'products', component: ProductsComponent},
  // product resolver running before component wiil be init
  {path: 'product/:id', component: ProductDetailsComponent, resolve: {data:ProductResolver}},
  {path: 'basket', component: BasketComponent},

  {path: "**", redirectTo: "", component: BaseComponent}
];

// declarate paths for application
// for main module we should register routs with forRoot method 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
// for importing by main module
export class AppRoutingModule { }
