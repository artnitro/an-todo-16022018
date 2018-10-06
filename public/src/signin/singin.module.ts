/**
* Sign in module.
*/

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SigninComponent } from './signin.component';

@NgModule({
  imports: [RouterModule, ReactiveFormsModule],
  declarations: [SigninComponent],
  exports: [SigninComponent]
})

export class SigninModule {}