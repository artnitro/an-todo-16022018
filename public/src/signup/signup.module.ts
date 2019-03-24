/**
 * Sign up module.
 */

import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RoutingModule } from './signup.routing';
import { MessageModule } from '../components/message/message.module';

import { SignupComponent } from './signup.component';
import { SignupService } from './signup.service';

@NgModule({
  imports: [
    RouterModule, 
    ReactiveFormsModule,
    CommonModule,
    RoutingModule,
    MessageModule
  ],
  providers: [SignupService],
  declarations: [SignupComponent]
})

export class SignupModule {}