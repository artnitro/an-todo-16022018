/**
 * Boards module.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsComponent } from './boards.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [],
  declarations: [BoardsComponent],
  exports: [BoardsComponent]
})

export class BoardsModule {}

