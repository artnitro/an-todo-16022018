/**
* Route for lazy loading.
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotpwdComponent } from './forgotpwd.component';

const routes: Routes = [
  { path: '', component: ForgotpwdComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class RoutingModule{}