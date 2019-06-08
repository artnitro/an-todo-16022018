/**
 * Route for lazy loading.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangepwdComponent } from './changepwd.component';

const routes:Routes = [
  { path: '', component: ChangepwdComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RoutingModule{}