/**
 * App starter service.
 */

import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { LOCAL, LANGUAGE } from './app.config';
import { SessionService } from './stores/session/session.service';

@Injectable({
  providedIn: 'root'
}) 
export class AppService {

  constructor(
    private localStorage: LocalStorageService,
    private sessionService: SessionService,
  ) {}

  init() {
    return new Promise<any> ( (resolve, reject) => {  
      if ( this.localStorage.retrieve(LOCAL.language) === null ) {
        this.localStorage.store(LOCAL.language, LANGUAGE.defaultLanguage );
      }
      this.sessionService.login();
      resolve();
    });
  }
}
