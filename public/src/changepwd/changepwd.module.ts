/**
 * Change password module.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';

import { RoutingModule } from './changepwd.routing';

import { ChangepwdComponent } from './changepwd.component';

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    RoutingModule,
  ],
  declarations: [ChangepwdComponent],
})

export class ChangepwdModule {}

