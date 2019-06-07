/**
 * Forgotpwd service.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { forgotPwd } from './forgotpwd.query';
import { IForgotpwdData } from './Iforgotpwddata';

@Injectable()

export class ForgotpwdService {
  
  constructor(private apollo: Apollo){}

  forgotpwd$(data: IForgotpwdData): Observable<any> {
    return this.apollo
      .use('oauth')
      .watchQuery({
        query: forgotPwd,
        variables: {
          email: data.email
        }
      })
      .valueChanges;
  }
}
