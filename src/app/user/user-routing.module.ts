import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../can-deactivate.guard';

import { CartComponent } from './cart/cart.component';
import { BagComponent } from './bag/bag.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { CheckComponent } from './check/check.component';
import { AuthGuard } from '../auth.guard';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';



const userRoutes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'order',
    component: OrdersComponent
  },
  {
    path: 'order-detail/:id',
    component: OrderDetailComponent
  },
  {
    path: 'bag',
    component: BagComponent,
    outlet: 'side'
  },
  {
    path: 'confirm',
    component: ConfirmComponent,
    canDeactivate: [CanDeactivateGuard]

  },
  {
    path: 'check',
    component: CheckComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  },
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
