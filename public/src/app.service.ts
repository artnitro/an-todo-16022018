/**
 * App starter service.
 */

import { Injectable } from '@angular/core';

import { SessionService } from './stores/session/session.service';
import { LanguageService } from './stores/language/language.service';

@Injectable({
  providedIn: 'root'
}) 
export class AppService {

  constructor(
    private sessionService: SessionService,
    private languageService: LanguageService,
  ) {}

  init() {
    return Promise.all([
      this.languageService.login(), 
      this.sessionService.login()
    ]);
  }
}
