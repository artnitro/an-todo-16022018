/**
 * Sign up module.
 */

import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import {SignupComponent} from './signup.component';

@NgModule({
  imports: [RouterModule, ReactiveFormsModule],
  declarations: [SignupComponent],
  exports: [SignupComponent]
})

export class SignupModule {}