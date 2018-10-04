/**
* Forgot password module.
*/

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ForgotpwdComponent} from './forgotpwd.component';

@NgModule({
  imports: [RouterModule, ReactiveFormsModule],
  declarations: [ForgotpwdComponent],
  exports: [ForgotpwdComponent]
})

export class ForgotpwdModule {}