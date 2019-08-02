/**
 * App starter service.
 */

import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { LOCAL, LANGUAGE } from './app.config';

@Injectable({
  providedIn: 'root'
}) 
export class AppService {

  constructor(
    private localStorage: LocalStorageService,
  ) {}

  init() {
    return new Promise<any> ( (resolve, reject) => {  
      if ( this.localStorage.retrieve(LOCAL.language) === null ) {
        this.localStorage.store(LOCAL.language, LANGUAGE.defaultLanguage );
      }
      resolve();
    });
  }
}
