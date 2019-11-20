/**
 * Session query.
 */

import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { SessionState } from './session.model';
import { SessionStore } from './session.store';

@Injectable({
  providedIn: 'root'
})

export class SessionQuery extends Query<SessionState> {
  isLogged$ = this.select('isLogged');
  userName$ = this.select('firstName');
  userEmail$ = this.select('email');

  constructor( protected store: SessionStore) {
    super(store);
  }
}