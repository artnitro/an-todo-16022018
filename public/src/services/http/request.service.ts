/**
 * Http service
 * @version 1.0
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class Request {

  constructor(private http:HttpClient) {}

  /**
   * @description
   * @param url 
   * @param options 
   * @returns Observable
   */
  get$(url: string, options?: any): Observable<any> {
    return this.http.get(url, options);
  }
  
  /**
   * @description
   * @param url 
   * @param body 
   * @param options
   * @returns Observable 
   */
  post$(url: string, body: any, options?: any): Observable<any> {
    return this.http.post(url, body, options);
  }
  
}