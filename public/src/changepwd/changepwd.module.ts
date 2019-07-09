/**
 * Change password module.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { RoutingModule } from './changepwd.routing';
import { MessageModule } from '../components/message/message.module';
import { InputModule } from '../components/input/input.module';
import { TranslateLazyConfigModule } from '../translate.lazy.config.module';

import { ChangepwdComponent } from './changepwd.component';
import { ChangepwdService } from './changepwd.service';

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
  providers: [ChangepwdService],
  declarations: [ChangepwdComponent],
})

export class ChangepwdModule {}

