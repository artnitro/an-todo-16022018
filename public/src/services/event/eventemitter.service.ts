/**
 * Event emitter
 */

import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators'

export class EventData {

  name: string;
  data: any; 

  constructor(name, data) {
    this.name = name;
    this.data = data;
  }
}

@Injectable({
  providedIn :'root'
})

export class EventEmitterService {
  
  private emitter$ = new Subject();
  
  /**
   * @description Event emitter.
   * @param event  string
   * @param data  any
   */
  emit(event: string, data: any) {
    this.emitter$.next(new EventData(event, data));
  }
  
  /**
   * @description Event dispatch.
   * @param eventName EventData
   * @param action any
   */
  on(eventName: string, action: any): Subscription {
    return this.emitter$.pipe(
      filter( (e:EventData) => e.name === eventName),
      map( (e:EventData) => e['data'])).subscribe(action);
  }
}