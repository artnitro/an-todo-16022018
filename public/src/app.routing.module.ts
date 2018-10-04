/**
 * Routing module.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'forgotpwd',
    component: ForgotpwdComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'signin',
    pathMatch: 'full'
  }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
