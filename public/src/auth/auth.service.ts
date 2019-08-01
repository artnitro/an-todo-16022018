/**
 * Auth service.
 */

import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { JwtHelperService } from '@auth0/angular-jwt';

import { LOCAL } from '../app.config';

const JWT = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;

  constructor(
    private LocalStorage: LocalStorageService
  ) {}

  isUser(): boolean {
    this.token = this.LocalStorage.retrieve(LOCAL.userData);
    return (this.token === null || JWT.isTokenExpired(this.token)) ? false : true;
  }


}