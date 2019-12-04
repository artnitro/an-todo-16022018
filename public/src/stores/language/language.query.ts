/**
 * Language query.
 */

import { Injectable } from '@angular/core';
import  { Query } from '@datorama/akita';

import { LanguageState } from './language.model';
import { LanguageStore } from './language.store';

@Injectable({
  providedIn: 'root'
})

export class LanguageQuery extends Query<LanguageState> {
  language$ = this.select('language');
  
  constructor( protected store: LanguageStore ) {
    super(store);
  }
}