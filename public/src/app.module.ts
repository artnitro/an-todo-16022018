/**
* Entry point to be bootstrapped.
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { GraphqlModule } from './graphql.module';
import { AppRoutingModule } from './app.routing.module';
import { SigninModule } from './signin/singin.module';

import { AppComponent } from './app.component';

@NgModule({
	imports: [
		BrowserModule,
		NgxWebstorageModule.forRoot({
			prefix: '',
			separator: ''
		}),
		HttpClientModule,
		GraphqlModule,
		AppRoutingModule, 
		SigninModule,
	],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})

export class AppModule {}
