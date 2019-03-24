/**
 * Signup service.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { createUser } from './createuser.mutation';
import { ICreateUserData } from './Icreateuserdata';

@Injectable()

export class SignupService {

  constructor(private apollo: Apollo) {}

  createUser$(data: ICreateUserData): Observable<any> {

    return this.apollo
      .use('oauth')
      .mutate({
        mutation: createUser,
        variables: {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          password: data.password
        }
      });

  }

}