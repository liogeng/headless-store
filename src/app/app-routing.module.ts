import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckComponent } from './check/check.component';
import { AuthGuard } from './auth.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GetbackPasswordComponent } from './getback-password/getback-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { MessagesComponent } from './messages/messages.component';
import { AddressComponent } from './address/address.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'group', component: ProductsComponent, canDeactivate: [CanDeactivateGuard]},
  {path: 'detail/:id', component: ProductDetailComponent},
  {path: 'cart', component: CartComponent, canDeactivate: [CanDeactivateGuard]},
  {path: 'check', component: CheckComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'getback-password', component: GetbackPasswordComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'messages', component: MessagesComponent},
  {path: 'address', component: AddressComponent},
  // {path: 'group/:id', component: ProductsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
