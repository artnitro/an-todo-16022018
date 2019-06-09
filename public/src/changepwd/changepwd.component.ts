/**
 * Change password component.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { JwtHelperService } from '@auth0/angular-jwt';

import { LOCAL } from '../app.config';

const JWT = new JwtHelperService();

@Component({
  selector: 'changepwd',
  templateUrl: './changepwd.html'
})

export class ChangepwdComponent {

  token: string;
  decodedToken: object;

  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    console.info('>>>>> Changepwd component.');
    this.token = this.localStorage.retrieve(LOCAL.forgotPwd);
    this.decodedToken = JWT.decodeToken(this.token);
  }

  ngOnInit() {
    if ( this.token === null || JWT.isTokenExpired(this.token) ) {
      this.router.navigate(['/signin']);
    }
  }

}