/**
* Entry to be bootstrapped.
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';
import { SigninModule } from './signin/singin.module';
import { SignupModule } from './signup/signup.module';

import { AppComponent } from './app.component';

@NgModule({
	imports: [BrowserModule, AppRoutingModule, SigninModule, SignupModule],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})

export class AppModule {}
