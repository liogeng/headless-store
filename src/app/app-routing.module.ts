import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from './auth.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';

import { ProfileComponent } from './user/profile/profile.component';
import { MessagesComponent } from './messages/messages.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [



  {path: 'profile', component: ProfileComponent},

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
