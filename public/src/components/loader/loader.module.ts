/**
 * Loader module.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader.component';

import { MathService } from "../../services/math/math.service";

@NgModule({
  imports: [CommonModule],
  providers:[MathService],
  declarations: [LoaderComponent],
  exports: [LoaderComponent]
})

export class LoaderModule{}