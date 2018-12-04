/**
 * Sign up component.
 */

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'

import { COLORS } from '../app.config';
import { AFields } from '../services/form/AFields';
import { ConfirmPasswordValidator } from '../services/form/validators/confirmpassword.validator';

@Component({
  selector: 'signup',
  templateUrl: './signup.html'
})

export class SignupComponent extends AFields implements OnInit {

  signupForm: FormGroup;

  hasError: object = {};

  formColor: string;
  formMessage: string;
  formMessageColor: string;

  constructor(private fb: FormBuilder) {
    super();
    console.info('>>>>> Signup component.');
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: this.required(),
      lastName: this.required(),
      email: this.email(),
      password: this.password(),
      confirmPassword: ['']
    },{
      validator: ConfirmPasswordValidator.MatchPassword
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

  signup() {
    this.hasError = this.checkFields(this.signupForm);
    (Object.keys(this.hasError).length)
      ? this.typingError(COLORS.red)
      :
        (
          this.typingOk(COLORS.black),
          this.sendData()
        )
  }

}