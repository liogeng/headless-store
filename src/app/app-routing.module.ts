import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CheckComponent } from './user/check/check.component';
import { AuthGuard } from './auth.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';

import { ProfileComponent } from './user/profile/profile.component';
import { OrdersComponent } from './user/orders/orders.component';
import { MessagesComponent } from './messages/messages.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [

  {path: 'check', component: CheckComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},

  {path: 'profile', component: ProfileComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'messages', component: MessagesComponent},
  // {path: 'address', component: AddressComponent},

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
