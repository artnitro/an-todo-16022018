/**
 * GraphQl module.
 */

import { NgModule } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { ApolloModule, Apollo} from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';

import { LocalStorageService } from 'ngx-webstorage';

import { SOURCE, LOCAL } from './app.config';

@NgModule({
  exports: [ApolloModule, HttpLinkModule]
})

export class GraphqlModule {

  private http: any;
  private token: string;
  private authLink: any;
  private errorLink: any;

  constructor(
    private apollo: Apollo, 
    private httpLink: HttpLink,
    private LocalStorage: LocalStorageService
  ) {

    // Setup oauth.

		apollo.create({
      link: httpLink.create({
        uri: SOURCE.connectOauth,
        withCredentials: true
      }),
			cache: new InMemoryCache()
    }, 'oauth');

    // Setup api.

    this.errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) graphQLErrors.map(({ message, locations, path }) => console.log(`>>>[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,),);
      if (networkError) console.log(`>>> [Network error]: ${networkError}`);

      return forward(operation); 
    });

    this.authLink = new ApolloLink((operation, forward) => {
      this.token = this.LocalStorage.retrieve(LOCAL.userData);
      
      console.log('>>> GET AUTH TOKEN: ', this.token);
      
      operation.setContext({
        headers: {
        'Authorization': this.token ? `Bearer ${this.token}` : ''
        }
      });
      return forward(operation);
    });
    
    this.http = httpLink.create({
      uri: SOURCE.connectApi,
      withCredentials: true
    });

    apollo.create({
      link: ApolloLink.from([this.errorLink, this.authLink, this.http]),
      cache: new InMemoryCache()
    }, 'api');
  
  }

}

// TODO: Primeramente, la no autorización la redirecciono nuevamente al login. Forma provisional.
// TODO: Posteriormente, refrescar token una vez expirado de forma automática. Forma definitiva.