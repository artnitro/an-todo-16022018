/**
 * Language store.
 */

import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { LanguageState } from './language.model';

export function initLanguage(): LanguageState {
  return {
   language: null,
  }
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'language'
})

export class LanguageStore extends Store<LanguageState> {
  constructor() {
    super(initLanguage());
  }
}