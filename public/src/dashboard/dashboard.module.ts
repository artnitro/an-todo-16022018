/**
 * Dashboard module.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ToolbarModule } from '../components/toolbar/toolbar.module'

import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ToolbarModule,
  ], 
  providers: [],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})

export class DashboardModule {}