/**
 * Language service
 */

import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';

import { LanguageStore } from './language.store'
import { LanguageState } from './language.model';
import { LOCAL, LANGUAGE } from '../../app.config';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
   
  constructor(
    private LocalStorage: LocalStorageService,
    private translate: TranslateService,
    private languageStore: LanguageStore,
  ) {}

  setLanguage(lang: LanguageState): void {
    let { language } = lang;
    this.languageStore.update({ language });
  }

  async login(): Promise<boolean> {
    let lang: string = this.LocalStorage.retrieve(LOCAL.language)
    return ( lang !== null )
      ? (
        this.setLanguage({language: lang}),
        true
      )
      : (
        this.LocalStorage.store(LOCAL.language, LANGUAGE.defaultLanguage ),
        this.setLanguage({language: LANGUAGE.defaultLanguage}),
        false
      )
  }

  updateLanguage(lang: string): void {
    this.setLanguage({ language: lang});
    this.LocalStorage.store(LOCAL.language, lang);
    this.translate.setDefaultLang(lang);
  }

}