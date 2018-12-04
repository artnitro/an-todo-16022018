/**
* Forgot password component.
*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { COLORS } from '../app.config';
import { AFields } from '../services/form/AFields';

@Component({
  selector: 'forgotpwd',
  templateUrl: './forgotpwd.html'
})

export class ForgotpwdComponent extends AFields implements OnInit {

  forgotpwdForm: FormGroup;

  hasError: object = {};
  
  formColor: string;
  formMessage: string;
  formMessageColor: string;

  constructor(private fb: FormBuilder) {
    super();
    console.info('>>>>> Forgotpwd component.');
  }

  ngOnInit() {
    this.forgotpwdForm = this.fb.group({
      email: this.email(),
    });
    this.formMessage = 'Type correctly data.';
  }

  // TODO:
  sendData() {
    console.log('>> Sending data');
  }

  typingError(colors: string) {
    this.formMessage = 'ERROR. Type correctly data.';
    this.formMessageColor = colors;
    this.formColor = colors;
  }

  typingOk(colors: string) {
    this.formMessage = 'OK. Waiting for server response.';
    this.formMessageColor = colors;
  }

  forgotPwd() {
    this.hasError = this.checkFields(this.forgotpwdForm);
    (Object.keys(this.hasError).length)
      ? this.typingError(COLORS.red)
      :
        (
          this.typingOk(COLORS.black),
          this.sendData()
        )
  }

}