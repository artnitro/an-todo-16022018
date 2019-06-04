/**
 * Dashboard component.
 */

 import { Component} from '@angular/core';

 @Component({
   selector: 'dashboard',
   templateUrl: './dashboard.html',
 })

 export class DashboardComponent {

  constructor() {
    console.log('>>>>> Dashboard componente');
  }

 }