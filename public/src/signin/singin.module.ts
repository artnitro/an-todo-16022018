/**
* Sign in module.
*/

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';

import { MessageModule } from '../components/message/message.module';

import { Request } from '../services/http/request.service';

import { SigninComponent } from './signin.component';


@NgModule({
  imports: [
    RouterModule, 
    ReactiveFormsModule, 
    CommonModule,
    MessageModule,
  ],
  providers: [Request],
  declarations: [SigninComponent],
  exports: [SigninComponent]
})

export class SigninModule {}