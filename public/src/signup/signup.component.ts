/**
 * Sign up component.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

import { COLORS, TOKEN } from '../app.config';
import { AFields } from '../services/form/AFields';
import { ConfirmPasswordValidator } from '../services/form/validators/confirmpassword.validator';
import { SignupService } from './signup.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.html'
})

export class SignupComponent extends AFields implements OnInit, OnDestroy {

  signupForm: FormGroup;

  subscription: Subscription;
  hasError: object = {};
  formColor: string;
  formMessage: string;
  formMessageColor: string;

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private localStorage: LocalStorageService 
  ) {
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
    this.localStorage.clear();
  }

  sendData() {
    this.subscription = this.signupService
      .createUser$({
        firstname: this.signupForm.value.firstName,
        lastname: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      })
      .pipe(map(result => result.data))
      .subscribe(
        data => {
          this.saveToken(data.createUser);
        },
        err => {
          console.warn('>>> Error: ', err);
          this.typingError(COLORS.red, err.toString().replace(/Error: GraphQL error:/g, ''));
        }
      );

    
  }

  // TODO:
  saveToken(token: string) {
    console.log('>>> Saving token');
    this.localStorage.store(TOKEN.tokenName, token);
    // Redirect to dashboard.
  }

  typingError(colors: string, text: string) {
    this.formMessage = text;
    this.formMessageColor = colors;
    this.formColor = colors;
  }

  typingOk(colors: string, text: string) {
    this.formMessage = text;
    this.formMessageColor = colors;
  }

  signup() {
    this.hasError = this.checkFields(this.signupForm);
    (Object.keys(this.hasError).length)
      ? this.typingError(COLORS.red, 'ERROR. Type correctly data.')
      :
        (
          this.typingOk(COLORS.black, 'OK. Waiting for server response.'),
          this.sendData()
        )
  }

  ngOnDestroy() {
    if ( typeof this.subscription !== 'undefined' ) this.subscription.unsubscribe();
  }

}