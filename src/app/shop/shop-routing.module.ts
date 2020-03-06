import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';

const shopRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'group/:id', component: ProductsComponent},
  {path: 'detail/:id', component: ProductDetailComponent},
  {path: 'search', component: ProductsComponent},
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(shopRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
