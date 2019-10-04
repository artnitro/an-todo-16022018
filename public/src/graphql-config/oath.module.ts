/**
 * Graphql oauth module.
 */

import { NgModule } from '@angular/core';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule , HttpLink } from  'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { SOURCE } from '../app.config';

@NgModule({
  imports: [ApolloModule, HttpLinkModule]
})

export class OauthModule {

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink
  ){
    apollo.create({
      link: httpLink.create({
        uri: SOURCE.connectOauth,
        withCredentials: true
      }),
      cache: new InMemoryCache()
    }, 'oauth');
  }
}

