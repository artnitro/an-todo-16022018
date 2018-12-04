/**
 * Routing module.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'forgotpwd',
    loadChildren: './forgotpwd/forgotpwd.module#ForgotpwdModule'
  },
  {
    path: 'signup',
    loadChildren: './signup/signup.module#SignupModule'
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
