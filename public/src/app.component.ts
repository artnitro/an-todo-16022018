/**
* Our root component.
*/

import { Component, Renderer2, OnInit, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';

import { akitaDevtools } from '@datorama/akita'; // Dev only.

import { LOCAL } from './app.config';

@Component({
	selector: 'an-todo-root',
	template: '<router-outlet></router-outlet>'
})

export class AppComponent implements OnInit {

	constructor( 
		private renderer: Renderer2,
		private translate: TranslateService,
		private localStorage: LocalStorageService, 
		private ngZone: NgZone // Dev only.
	) {}

	ngOnInit() {

		// Development only

		if (an_ENVIRONMENT !== 'production') {
			akitaDevtools(this.ngZone);
		}

		// Setup background
		
		this.renderer.setStyle(document.body, 'background', 'url("../img/inicio.jpg") no-repeat center center fixed');
		this.renderer.setStyle(document.body, 'background-size', 'cover');

		// Setup language

		this.translate.setDefaultLang(this.localStorage.retrieve(LOCAL.language));
	}
}
