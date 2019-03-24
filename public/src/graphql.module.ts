/**
 * GraphQl module.
 */

import { NgModule } from '@angular/core';

import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory"

@NgModule({
  exports: [ApolloModule, HttpLinkModule]
})

export class GraphqlModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
		apollo.create({
			link: httpLink.create({uri: 'https://oauth.antodo.local:5000/oauth/v1/'}), // TODO: Put uri of app.config
			cache: new InMemoryCache()
    }, 'oauth');
  }
}