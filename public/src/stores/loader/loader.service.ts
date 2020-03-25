/**
 * Loader service.
 */

import { Injectable } from '@angular/core';

import { LoaderStore } from './loader.store';
// import { LoaderState } from './loader.model';
import { LoaderQuery } from './loader.query';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {

  constructor(
    private loaderStore: LoaderStore, 
    private loaderQuery: LoaderQuery,
  ){}

  private setLoader(value: boolean) {
    this.loaderStore.update({loader: value});
  } 

  showLoader() {
    this.setLoader(true);
  }

  hideLoader() {
    this.setLoader(false);
  }
  
}