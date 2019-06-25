/**
 * App starter service.
 */

import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { LOCAL, LANGUAGE } from './app.config';

@Injectable() 
export class AppService {

  token: string;

  constructor(
    private localStorage: LocalStorageService,
  ) {}

  init() {
    return new Promise<any> ( (resolve, reject) => {  
      this.token = this.localStorage.retrieve(LOCAL.userData);
      if ( this.localStorage.retrieve(LOCAL.language) === null ) {
        this.localStorage.store(LOCAL.language, LANGUAGE.defaultLanguage );
      }
      resolve();
    });
  }
}

