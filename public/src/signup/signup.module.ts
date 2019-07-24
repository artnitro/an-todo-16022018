/**
 * Sign up module.
 */

import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { RoutingModule } from './signup.routing';
import { MessageModule } from '../components/message/message.module';
import { InputModule } from '../components/input/input.module';
import { TranslateLazyConfigModule } from '../translate.lazy.config.module';

import { SignupComponent } from './signup.component';
import { SignupService } from './signup.service';

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
  providers: [SignupService],
  declarations: [SignupComponent]
})

export class SignupModule {}