/**
 * Auth service.
 */

import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { SessionQuery } from '../stores/session/session.query';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  subscription: Subscription;

  constructor(
    private sessionQuery: SessionQuery,
  ) {}

  isUser(): boolean {
    let logged: boolean;

    this.subscription = this.sessionQuery.isLogged$.subscribe( isLogged => {
      logged = isLogged;
    })

    return logged;
  }

}