/**
 * Dashboard module.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { MenudropdownModule } from '../components/menudropdown/menudropdown.module';
import { LoaderModule } from '../components/loader/loader.module';

import { MenuDirective } from '../Directives/menu/menu.directive';

import { DashboardComponent } from './dashboard.component';

import { EventEmitterService } from '../services/event/eventemitter.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ToolbarModule,
    MenudropdownModule,
    LoaderModule,
  ], 
  providers: [
    EventEmitterService,
  ],
  declarations: [MenuDirective, DashboardComponent],
  exports: [DashboardComponent]
})

export class DashboardModule {}