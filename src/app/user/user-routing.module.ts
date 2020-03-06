import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../can-deactivate.guard';

import { CartComponent } from './cart/cart.component';
import { BagComponent } from './bag/bag.component';
import { AddressComponent } from './address/address.component';


const userRoutes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'bag',
    component: BagComponent,
    // canDeactivate: [CanDeactivateGuard],
    outlet: 'side'
  },
  {path: 'address', component: AddressComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
