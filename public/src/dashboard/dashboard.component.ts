/**
 * Dashboard component.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SessionQuery } from '../stores/session/session.query';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.html',
})

export class DashboardComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;

  userImage: string = '';
  name: string; 
  
  constructor(  
    private sessionQuery: SessionQuery,
  ) {
    console.log('>>>>> Dashboard componente');
  }

  ngOnInit() {
    this.subscription.add(this.sessionQuery.userName$.subscribe( userName => {
    this.name = userName;
    })); 

    // TODO: Los datos de la url de la imagen del usuario los tengo que tomar 
    // de los datos cargados de la configuración del usuario. Tengo que ver
    // como los almaceno y los cargo.

    this.userImage = '../../img/arturo.jpg';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
