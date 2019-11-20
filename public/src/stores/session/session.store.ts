/**
 * Session store.
 */

import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { SessionState } from './session.model';

export function initSession(): SessionState {
  return {
    isLogged: false,
    email: null,
    firstName: null
  }
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'session'
})

export class SessionStore extends Store<SessionState> {
  constructor() {
    super(initSession());
  }
}
