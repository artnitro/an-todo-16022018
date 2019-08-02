/**
* Entry point to be bootstrapped.
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { GraphqlModule } from './graphql.module';
import { TranslateConfigModule } from './translate.config.module';
import { AppRoutingModule } from './app.routing.module';
import { SigninModule } from './signin/singin.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { BoardsModule } from './boards/boards.module';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

export function initializeAppFactory( appService: AppService ) {
	return (): Promise<any> => {
		return appService.init();
	}
}

@NgModule({
	imports: [
		BrowserModule,
		NgxWebstorageModule.forRoot({
			prefix: '',
			separator: ''
		}),
		HttpClientModule,
		GraphqlModule,
		TranslateConfigModule,
		AppRoutingModule, 
		SigninModule,
		DashboardModule,
		BoardsModule,
	],
	providers: [
		AppService,
		{ provide: APP_INITIALIZER, useFactory: initializeAppFactory, deps: [AppService], multi: true }
	],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})

export class AppModule {}
