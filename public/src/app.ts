/**
* The main entry point of the application.
*/

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

import '../scss/index.scss';

console.log('>>> Starting the application.');
console.log('>>> Environment: ', an_ENVIRONMENT);

if (an_ENVIRONMENT == 'production') {
  enableProdMode();
}

switch (document.readyState) {
  case 'loading':
    console.log('> Loading.');
  case 'interactive': 
    console.log('> Interactive.');
  case 'complete':
    bootstrap();
    break;
  default:
    document.addEventListener('DOMContentLoaded', () => bootstrap());
}


function bootstrap() {
  console.log('> Completed load.');
  console.log('> Loaded and parsed DOM.');

  platformBrowserDynamic().bootstrapModule(AppModule);  
}

