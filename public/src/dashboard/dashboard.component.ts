/**
 * Dashboard component.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { MENU } from '../app.config';

import { SessionQuery } from '../stores/session/session.query';
import { LanguageQuery } from '../stores/language/language.query';
import { LoaderQuery } from '../stores/loader/loader.query';

import { EventEmitterService } from '../services/event/eventemitter.service';
import { LanguageService } from '../stores/language/language.service';



@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.html',
})

export class DashboardComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;

  userImage: string = '';
  name: string;
  usedLanguage: string;
  loaded: boolean = false;
  languageMenuData: Array<object> =  MENU.languages;
  eventNameEmitted: string = 'LanguageChange';

  constructor(  
    private sessionQuery: SessionQuery,
    private languageQuery: LanguageQuery,
    private eventEmitter : EventEmitterService,
    private languageService: LanguageService,
    private loaderQuery: LoaderQuery,
  ) {
    console.log('>>>>> Dashboard componente');
  }

  ngOnInit() {
    this.subscription.add(combineLatest(this.sessionQuery.userName$, this.languageQuery.language$, this.loaderQuery.isLoading$)
      .subscribe( ([userName, language, loaded]) => {
        this.name = userName;
        this.usedLanguage = language;
        this.loaded = loaded;
      })
    );

    this.eventEmitter.on('LanguageChange', (language: any) => {
      this.usedLanguage = language.data;
      this.languageService.updateLanguage(language.data);
    });
    
    // TODO: Los datos de la url de la imagen del usuario los tengo que tomar 
    // de los datos cargados de la configuración del usuario. Tengo que ver
    // como los almaceno y los cargo.

    this.userImage = '../../img/arturo.jpg';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
