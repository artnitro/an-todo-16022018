/**
 * Sign in component.
*/

import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { COLORS, LOCAL } from '../app.config';
import { AFields } from '../services/form/AFields';
import { SigninService } from './signin.service';
import { SessionService } from '../stores/session/session.service';
import { SessionQuery } from '../stores/session/session.query';

@Component({
  selector: 'signin',
  templateUrl: './signin.html',
})

export class SigninComponent extends AFields implements OnInit, OnDestroy {
  
  signinForm: FormGroup;
  
  private subsc: Subscription = new Subscription();
  hasError: object = {};
  formColor: string;
  formMessage: string; 
  formMessageColor: string;
  
  constructor(
    private fb: FormBuilder, 
    private signinService: SigninService,
    public translate: TranslateService,
    private router: Router,
    private sessionService: SessionService,
    private sessionQuery: SessionQuery
  ) {
    super(); 
    console.info('>>>>> Signin component.');
  }

  ngOnInit() {
    this.subsc.add(this.sessionQuery.isLogged$.subscribe( isLogged => {
      if ( isLogged ) this.router.navigate(['/dashboard']);
    }));
    this.signinForm = this.fb.group({
      email: this.email(),
      password: this.password()
    });
    this.subsc.add(this.translate.get('SIGNIN.STATUS1').subscribe((res: string) => {
      this.formMessage = res;
    }));
  }

  sendData() {
    this.subsc.add(this.signinService 
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
      ));
  }

  saveToken(token: string) {
    this.sessionService.updateToken(token);
    this.router.navigate(['/dashboard']);
  }

  typingData(colors: string, text: string) {
    this.subsc.add(this.translate.get(text).subscribe((res: string) => {
      this.formMessage = res;
      this.formMessageColor = colors;
      this.formColor = colors;
    }));
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
    this.subsc.unsubscribe();
  }

}