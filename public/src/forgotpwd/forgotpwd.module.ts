/**
* Forgot password module.
*/

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { RoutingModule } from './forgotpwd.routing';
import { MessageModule } from '../components/message/message.module';
import { InputModule } from '../components/input/input.module';
import { TranslateLazyConfigModule } from '../translate.lazy.config.module';

import { ForgotpwdComponent} from './forgotpwd.component';
import { ForgotpwdService } from './forgotpwd.service';

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    TranslateLazyConfigModule, 
    RoutingModule,
    MessageModule, 
    InputModule
  ],
  providers: [ForgotpwdService],
  declarations: [ForgotpwdComponent],
})

export class ForgotpwdModule {}