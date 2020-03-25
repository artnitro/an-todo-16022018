/**
 * Loader store.
 */

import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { LoaderState } from './loader.model';

export function initLoader(): LoaderState {
  return {
    loader: false,
  }
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'loader'
})

export class LoaderStore extends Store<LoaderState> {
  constructor() {
    super(initLoader());
  }
}
