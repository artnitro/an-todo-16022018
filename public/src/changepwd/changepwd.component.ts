/**
 * Change password component.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';

import { COLORS, LOCAL } from '../app.config';
import { AFields } from '../services/form/AFields';
import { ConfirmPasswordValidator } from '../services/form/validators/confirmpassword.validator';
import { ChangepwdService } from './changepwd.service';
import { LanguageQuery } from '../stores/language/language.query';

const JWT = new JwtHelperService();

@Component({
  selector: 'changepwd',
  templateUrl: './changepwd.html'
})

export class ChangepwdComponent extends AFields implements OnInit, OnDestroy {

  changepwdForm: FormGroup;

  private subscription: Subscription = new Subscription;
  token: string;
  decodedToken: object;
  hasError: object = {};
  formColor: string;
  formMessage: string;
  formMessageColor: string;
  show: boolean = true;

  constructor(
    private fb: FormBuilder,
    private changepwdService: ChangepwdService,
    private router: Router,
    private localStorage: LocalStorageService,
    private translate: TranslateService, 
    private languageQuery: LanguageQuery,
  ) {
    super();
    console.info('>>>>> Changepwd component.');
    this.subscription.add(this.languageQuery.language$.subscribe( (language: string) => {
			this.translate.setDefaultLang(language);
		}));
    this.token = this.localStorage.retrieve(LOCAL.forgotPwd);
  }

  ngOnInit() {
    this.decodedToken = ( this.token === null || JWT.isTokenExpired(this.token) )
      ? (() => { this.router.navigate(['/signin']); })()
      : JWT.decodeToken(this.token);
    this.changepwdForm = this.fb.group({
      password: this.password(),
      confirmPassword: ['']
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
    this.subscription.add(this.translate.get('CHANGEPWD.STATUS1').subscribe((res: string) => {
      this.formMessage = res;
    }));
  }

  changepwd() {
    this.hasError = this.checkFields(this.changepwdForm);
    (Object.keys(this.hasError).length)
      ? this.typingData(COLORS.red, 'CHANGEPWD.ERROR1')
      :
        (
          this.typingData(COLORS.black, 'CHANGEPWD.STATUS2'),
          this.sendData()
        )
  }

  sendData() {
    this.subscription.add(this.changepwdService
      .changePwd$({
        email: this.decodedToken['email'],
        password: this.changepwdForm.value.password
      })
      .pipe(map(result => result.data))
      .subscribe(
        data => {
          if (data) {
            this.show = false;
            this.localStorage.clear(LOCAL.forgotPwd);
          }
        }, 
        err => {
          Object
          .keys(err.graphQLErrors)
          .filter((element) => {
            (err.graphQLErrors[element]['statusCode'] && err.graphQLErrors[element]['statusCode'] === 400)
              ? this.typingData(COLORS.red, 'CHANGEPWD.ERROR1')
              : (
                  console.error('>>> The statusCode property is likely not setup.'),
                  this.typingData(COLORS.red, 'CHANGEPWD.ERROR3')
                )
          })
        }
      ));
  }

  typingData(colors: string, text: string) {
    this.subscription.add(this.translate.get(text).subscribe((res: string) => {
      this.formMessage = res;
      this.formMessageColor = colors;
      this.formColor = colors;
    }));
  }

  changeContinue() {
    this.router.navigate(['/signin']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}