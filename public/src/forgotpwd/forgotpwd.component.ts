/**
* Forgot password component.
*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { COLORS, LANGUAGE } from '../app.config';
import { AFields } from '../services/form/AFields';

@Component({
  selector: 'forgotpwd',
  templateUrl: './forgotpwd.html'
})

export class ForgotpwdComponent extends AFields implements OnInit {

  forgotpwdForm: FormGroup;

  hasError: object = {};
  show: boolean = true;
  
  formColor: string;
  formMessage: string;
  formMessageColor: string;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService
  ) {
    super();
    console.info('>>>>> Forgotpwd component.');
    this.translate.setDefaultLang(LANGUAGE.defaultLanguage);
  }

  ngOnInit() {
    this.forgotpwdForm = this.fb.group({
      email: this.email(),
    });
    this.translate.get('FORGOTPWD.STATUS1').subscribe((res: string) => {
      this.formMessage = res;
    });
  }

  // TODO:
  sendData() {
    console.log('>> Sending data');
  }

  typingData(colors: string, text: string) {
    this.translate.get(text).subscribe((res: string) => {
      this.formMessage = res;
      this.formMessageColor = colors;
      this.formColor = colors;
    });
  }

  forgotPwd() {
    this.hasError = this.checkFields(this.forgotpwdForm);
    (Object.keys(this.hasError).length)
      ? this.typingData(COLORS.red, 'FORGOTPWD.ERROR1')
      :
        (
          this.typingData(COLORS.black, 'FORGOTPWD.STATUS2'),
          this.sendData()
        )
  }

}