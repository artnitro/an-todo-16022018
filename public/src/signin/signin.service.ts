/**
 * Signin service.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { isUser } from './isuser.query';
import { IUserData } from './Iuserdata';

@Injectable() 

export class SigninService {

  constructor(private apollo: Apollo) {}

  isUser$(data: IUserData): Observable<any> {

    return this.apollo
      .use('oauth')
      .watchQuery({
        query: isUser, 
        variables: {
          email: data.email,
          password: data.password
        }
      })
      .valueChanges;

  }

}