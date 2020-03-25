/**
 * Loader Query.
 */

import { Injectable } from '@angular/core';
import  { Query } from '@datorama/akita';

import { LoaderState } from './loader.model';
import { LoaderStore } from './loader.store';

@Injectable({
  providedIn: 'root'
})

export class LoaderQuery extends Query<LoaderState> {
  isLoading$ = this.select('loader');

  constructor( protected store: LoaderStore ) {
    super(store);
  }
}