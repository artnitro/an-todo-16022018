/**
* Our root component.
*/

import { Component, Renderer2, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LANGUAGE } from './app.config';

@Component({
	selector: 'an-todo-root',
	template: '<router-outlet></router-outlet>'
})

export class AppComponent implements OnInit {

	constructor( 
		private renderer: Renderer2,
		private translate: TranslateService
	) {}

	ngOnInit() {

		// Setup background
		
		this.renderer.setStyle(document.body, 'background', 'url("../img/inicio.jpg") no-repeat center center fixed');
		this.renderer.setStyle(document.body, 'background-size', 'cover');

		// Setup language

		this.translate.setDefaultLang(LANGUAGE.defaultLanguage);
	}
}
