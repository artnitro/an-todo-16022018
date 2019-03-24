/**
 * Sign in component.
*/

import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

import { COLORS, TOKEN } from '../app.config';
import { AFields } from '../services/form/AFields';
import { SigninService } from './signin.service';

@Component({
  selector: 'signin',
  templateUrl: './signin.html',
})

export class SigninComponent extends AFields implements OnInit, OnDestroy {
  
  signinForm: FormGroup;

  subscription: Subscription;
  hasError: object = {};
  formColor: string;
  formMessage: string; 
  formMessageColor: string;
  
  constructor(
    private fb: FormBuilder, 
    private signinService: SigninService,
    private LocalStorage: LocalStorageService
  ) {
    super();
    console.info('>>>>> Signin component.');
  }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: this.email(),
      password: this.password()
    });
    this.formMessage = 'Type correctly data.';
    this.LocalStorage.clear();
  }

  sendData() {
    this.subscription = this.signinService 
      .isUser$({
        email: this.signinForm.value.email, 
        password: this.signinForm.value.password
      })
      .pipe(map(result => result.data))
      .subscribe(
        data => {
          this.saveToken(data.isUser);
        },
        err => {
          console.warn('>>> Error: ', err);
          this.typingError(COLORS.red, err.toString().replace(/Error: GraphQL error:/g, ''));
        }
      );
  }

  // TODO: 
  saveToken(token: string) {
    console.log ('>>> Saving token.');
    this.LocalStorage.store(TOKEN.tokenName, token);
    // Redirect to dashboard
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

  signin() {
    this.hasError = this.checkFields(this.signinForm);
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