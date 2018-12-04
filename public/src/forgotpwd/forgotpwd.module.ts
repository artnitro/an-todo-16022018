/**
* Forgot password module.
*/

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';

import { RoutingModule } from './forgotpwd.routing';
import { MessageModule } from '../components/message/message.module';

import { ForgotpwdComponent} from './forgotpwd.component';

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule, 
    RoutingModule,
    MessageModule
  ],
  declarations: [ForgotpwdComponent],
})

export class ForgotpwdModule {}