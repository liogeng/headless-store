import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GetbackPasswordComponent } from './getback-password/getback-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthComponent } from './auth/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    GetbackPasswordComponent,
    ChangePasswordComponent,
    AuthComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
