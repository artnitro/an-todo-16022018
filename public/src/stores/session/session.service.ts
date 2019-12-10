/**
 * Session service.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { JwtHelperService } from '@auth0/angular-jwt';

import { SessionStore } from './session.store'
import { SessionState } from './session.model';
import { LOCAL } from '../../app.config';

const JWT = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  
  constructor(
    private sessionStore: SessionStore,
    private LocalStorage: LocalStorageService,
  ) {}

  setSession(session: SessionState): void {
    let  { isLogged, email, firstName } = session;
    this.sessionStore.update({ isLogged, email, firstName });  
  }

  async login(): Promise<boolean> {
    let token: string = this.LocalStorage.retrieve(LOCAL.userData);
    return ( token !== null && !JWT.isTokenExpired(token) )
      ? (
          this.setSession(JWT.decodeToken(token)),
          true
      )
      : ( 
          this.setSession({ isLogged: false, email: null, firstName: null }),
          false
      )
  }

  updateToken(token: string): void {
    this.LocalStorage.store(LOCAL.userData, token);
    this.setSession(JWT.decodeToken(token));
  }

  logout(): void {
    this.LocalStorage.clear(LOCAL.userData);
    this.setSession({ isLogged: false, email: null, firstName: null });
  }

}