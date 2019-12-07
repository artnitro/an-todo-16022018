/**
 * Sign up component.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { COLORS, LOCAL } from '../app.config';
import { AFields } from '../services/form/AFields';
import { ConfirmPasswordValidator } from '../services/form/validators/confirmpassword.validator';
import { SignupService } from './signup.service';
import { LanguageQuery } from '../stores/language/language.query';
import { SessionService } from '../stores/session/session.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.html'
})

export class SignupComponent extends AFields implements OnInit, OnDestroy {

  signupForm: FormGroup;

  private subscription: Subscription = new Subscription();
  hasError: object = {};
  formColor: string;
  formMessage: string;
  formMessageColor: string;

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private translate: TranslateService ,
    private router: Router,
    private languageQuery: LanguageQuery,
    private sessionService: SessionService,
  ) {
    super();
    console.info('>>>>> Signup component.');
    this.subscription.add(this.languageQuery.language$.subscribe( (language: string) => {
			this.translate.setDefaultLang(language);
		}));
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: this.firstName(),
      lastName: this.lastName(),
      email: this.email(),
      password: this.password(),
      confirmPassword: ['']
    },{
      validator: ConfirmPasswordValidator.MatchPassword
    });
    this.subscription.add(this.translate.get('SIGNUP.STATUS1').subscribe((res: string) => {
      this.formMessage = res;
    }));
  }

  sendData() {
    this.subscription.add(this.signupService
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
          Object
            .keys(err.graphQLErrors)
            .filter((element) => {
              (err.graphQLErrors[element]['statusCode'] && err.graphQLErrors[element]['statusCode'] === 400)
                ? this.typingData(COLORS.red, 'SIGNUP.ERROR2')
                : (err.graphQLErrors[element]['statusCode'] && err.graphQLErrors[element]['statusCode'] === 419)
                    ? this.typingData(COLORS.red, 'SIGNUP.ERROR1')
                    : (
                        console.error('>>> The statusCode property is likely not setup.'),
                        this.typingData(COLORS.red, 'SIGNUP.ERROR3')
                      );
            })
        }
      ));
  }

  saveToken(token: string) {
    this.sessionService.updateToken(token);
    this.router.navigate(['/dashboard']);
  }

  typingData(colors: string, text: string) {
    this.subscription.add(this.translate.get(text).subscribe((res: string) => {
      this.formMessage = res;
      this.formMessageColor = colors;
      this.formColor = colors;
    }));
  }

  signup() {
    this.hasError = this.checkFields(this.signupForm);
    (Object.keys(this.hasError).length)
      ? this.typingData(COLORS.red, 'SIGNUP.ERROR1')
      :
        (
          this.typingData(COLORS.black, 'SIGNUP.STATUS2'),
          this.sendData()
        )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}