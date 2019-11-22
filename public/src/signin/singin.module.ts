/**
* Sign in module.
*/

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MessageModule } from '../components/message/message.module';
import { InputModule } from '../components/input/input.module';
import { SigninComponent } from './signin.component';
import { SigninService } from './signin.service';

import { SessionService } from '../stores/session/session.service';

@NgModule({
  imports: [
    RouterModule, 
    ReactiveFormsModule, 
    CommonModule,
    TranslateModule,
    MessageModule,
    InputModule,
  ],
  providers: [
    SigninService,
    SessionService
  ],
  declarations: [SigninComponent],
  exports: [SigninComponent]
})

export class SigninModule {}