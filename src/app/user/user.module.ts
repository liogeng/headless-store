import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { QRCodeModule } from 'angularx-qrcode';
import { MatExpansionModule } from '@angular/material/expansion';

import { CartComponent } from './cart/cart.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { CheckComponent } from './check/check.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { MatButtonModule } from '@angular/material/button';
import { UserRoutingModule } from './user-routing.module';
import { BagComponent } from './bag/bag.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { LayoutModule } from '@angular/cdk/layout';
import { ReceiptComponent } from './receipt/receipt.component';
import { CheckTypeComponent } from './check-type/check-type.component';


@NgModule({
  declarations: [
    CartComponent,
    CartListComponent,
    CheckComponent,
    OrdersComponent,
    ProfileComponent,
    AddressComponent,
    BagComponent,
    ReceiptComponent,
    CheckTypeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatRadioModule,
    MatFormFieldModule,
    MatOptionModule,
    MatIconModule,
    MatStepperModule,
    MatExpansionModule,
    QRCodeModule,
    LayoutModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
