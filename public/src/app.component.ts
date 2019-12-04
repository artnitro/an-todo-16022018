/**
* Our root component.
*/

import { Component, Renderer2, OnInit, OnDestroy , NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { akitaDevtools } from '@datorama/akita'; // Dev only.

import { LanguageQuery } from './stores/language/language.query';
import { LOCAL } from './app.config';

@Component({
	selector: 'an-todo-root',
	template: '<router-outlet></router-outlet>'
})

export class AppComponent implements OnInit, OnDestroy {

	private subscription: Subscription = new Subscription();

	constructor( 
		private renderer: Renderer2,
		private translate: TranslateService,
		private languageQuery: LanguageQuery, 
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

		this.subscription.add(this.languageQuery.language$.subscribe( (language: string) => {
			this.translate.setDefaultLang(language);
		}));

	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
