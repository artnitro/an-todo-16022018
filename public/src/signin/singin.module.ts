/**
* Sign in module.
*/

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MessageModule } from '../components/message/message.module';
import { SigninComponent } from './signin.component';
import { SigninService } from './signin.service';

@NgModule({
  imports: [
    RouterModule, 
    ReactiveFormsModule, 
    CommonModule,
    TranslateModule,
    MessageModule,
  ],
  providers: [SigninService],
  declarations: [SigninComponent],
  exports: [SigninComponent]
})

export class SigninModule {}