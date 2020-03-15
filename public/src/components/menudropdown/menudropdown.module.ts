/**
 * Dropdown menu module.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenudropdownComponent } from './menudropdown.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MenudropdownComponent],
  exports: [MenudropdownComponent]
})

export class MenudropdownModule {}
