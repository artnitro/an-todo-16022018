/**
 * Dashboard component.
 */

import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { JwtHelperService } from '@auth0/angular-jwt';

import { LOCAL } from '../app.config';

const JWT = new JwtHelperService();

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.html',
})

export class DashboardComponent implements OnInit {

  token: string;
  userData: object;
  userImage: string = '';
  name: string; 
  

  constructor(
    private LocalStorage: LocalStorageService,
  ) {
    console.log('>>>>> Dashboard componente');
    this.token = this.LocalStorage.retrieve(LOCAL.userData);
  }

  ngOnInit() {
    this.userData = JWT.decodeToken(this.token);
    this.name = this.userData['firstName'];

    // TODO: Los datos de la url de la imagen del usuario los tengo que tomar 
    // de los datos cargados de la configuración del usuario. Tengo que ver
    // como los almaceno y los cargo.

    this.userImage = '../../img/arturo.jpg';
  }
}
