/**
 * Sign in component.
*/

import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';

import { COLORS, LOCAL } from '../app.config';
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
    private LocalStorage: LocalStorageService, 
    public translate: TranslateService,
    private router: Router,
  ) {
    super(); 
    console.info('>>>>> Signin component.');
  }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: this.email(),
      password: this.password()
    });
    this.translate.get('SIGNIN.STATUS1').subscribe((res: string) => {
      this.formMessage = res;
    });

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
          Object
            .keys(err.graphQLErrors)
            .filter((element) => {
              (err.graphQLErrors[element]['statusCode'] && err.graphQLErrors[element]['statusCode'] === 401)
                ? this.typingData(COLORS.red, 'SIGNIN.ERROR2')
                : (
                    console.error('>>> The statusCode property is likely not setup.'),
                    this.typingData(COLORS.red, 'SIGNIN.ERROR3')
                  )
            })
        }
      );
  }

  saveToken(token: string) {
    console.log ('>>> Saving token.');
    this.LocalStorage.store(LOCAL.userData, token);
    this.router.navigate(['/dashboard']);
  }

  typingData(colors: string, text: string) {
    this.translate.get(text).subscribe((res: string) => {
      this.formMessage = res;
      this.formMessageColor = colors;
      this.formColor = colors;
    });
  }

  signin() {
    this.hasError = this.checkFields(this.signinForm);
    (Object.keys(this.hasError).length)
      ? this.typingData(COLORS.red, 'SIGNIN.ERROR1')
      :
        (      
          this.typingData(COLORS.black, 'SIGNIN.STATUS2'),
          this.sendData()
        )
  }

  ngOnDestroy() {
    if ( typeof this.subscription !== 'undefined' ) this.subscription.unsubscribe();
  }

}