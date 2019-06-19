/**
 * Change passsword service.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { changePwd } from './changepwd.mutation';
import { IChangePwdData } from './Ichangepwddata';

export class ChangepwdService {
  
  constructor(private apollo: Apollo) {}

  changePwd$(data: IChangePwdData): Observable<any> {

    return this.apollo
      .use('oauth')
      .mutate({
        mutation: changePwd,
        variables: {
          email: data.email,
          password: data.password
        }
      });

  }

}
