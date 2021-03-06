/**
* Forgot password component.
*/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';

import { COLORS, LOCAL } from '../app.config';
import { AFields } from '../services/form/AFields';
import { ForgotpwdService } from './forgotpwd.service';
import { LanguageQuery } from '../stores/language/language.query';

@Component({
  selector: 'forgotpwd',
  templateUrl: './forgotpwd.html'
})

export class ForgotpwdComponent extends AFields implements OnInit, OnDestroy {

  forgotpwdForm: FormGroup;

  private subscription: Subscription = new Subscription();
  hasError: object = {};
  show: boolean = true;
  
  formColor: string;
  formMessage: string;
  formMessageColor: string;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private forgotpwdService: ForgotpwdService,
    private LocalStorage: LocalStorageService,
    private router: Router,
    private languageQuery: LanguageQuery,
  ) {
    super();
    console.info('>>>>> Forgotpwd component.');
    this.subscription.add(this.languageQuery.language$.subscribe( (language: string) => {
			this.translate.setDefaultLang(language);
		}));
  }

  ngOnInit() {
    this.forgotpwdForm = this.fb.group({
      email: this.email(),
    });
    this.subscription.add(this.translate.get('FORGOTPWD.STATUS1').subscribe((res: string) => {
      this.formMessage = res;
    }));
  }

  sendData() {
    this.subscription.add(this.forgotpwdService
      .forgotpwd$({
        email: this.forgotpwdForm.value.email
      })
      .pipe(map(result => result.data))
      .subscribe(
        data => {
          this.saveToken(data.forgotPwd);
        },
        err => {
          Object
            .keys(err.graphQLErrors)
            .filter((element) => {
              (err.graphQLErrors[element]['statusCode'] && err.graphQLErrors[element]['statusCode'] === 401)
                ? this.typingData(COLORS.red, 'FORGOTPWD.ERROR2')
                : (
                    console.error('>>> The statusCode property is likely not setup.'),
                    this.typingData(COLORS.red, 'FORGOTPWD.ERROR3')
                  )
            })
        }
      ));
  }

  saveToken(token: string) {
    this.LocalStorage.store(LOCAL.forgotPwd, token);
    this.show = false;
  }

  typingData(colors: string, text: string) {
    this.subscription.add(this.translate.get(text).subscribe((res: string) => {
      this.formMessage = res;
      this.formMessageColor = colors;
      this.formColor = colors;
    }));
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

  forgotContinue() {
    this.router.navigate(['/signin']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}