/**
 * Graphql api module
 */

import { NgModule } from '@angular/core';

import { ApolloModule, Apollo} from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { LocalStorageService } from 'ngx-webstorage';

import { SOURCE, LOCAL } from '../app.config';

@NgModule({
  imports: [ApolloModule, HttpLinkModule]
})

export class ApiModule {

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private LocalStorage: LocalStorageService,
  ) {

    // Setup error.

    const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) graphQLErrors.map(({ message, locations, path }) => console.log(`>>>[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,),);
      if (networkError) console.log(`>>> [Network error]: ${networkError}`);
      return forward(operation); 
    });

    // Setup authoritation header.

    const authLink = new ApolloLink((operation, forward) => {
      let token = this.LocalStorage.retrieve(LOCAL.userData);
      operation.setContext({
        headers: {
        'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      return forward(operation);
    });

    // Setup http link.

    const http = httpLink.create({
      uri: SOURCE.connectApi,
      withCredentials: true
    });

    // Setup socket link.

    const wss = new WebSocketLink({
      uri: SOURCE.connectApiSocket,
      options: {
        reconnect: true, 
        connectionParams: {
          headers: { // Posiblemente no haga falta pasar autorización, la tengo ya en el link: authLink
            'Authoritation': (() => { 
              let token = this.LocalStorage.retrieve(LOCAL.userData)
              return token ? `Bearer ${token}` : '';
            })()
          } 
        }
      }
    });

    // Setup link.

    const link = ApolloLink.split( ({ query }) => {
      let definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
      wss,
      ApolloLink.from([errorLink, authLink, http]),
    );

    // Setup Apollo.

    apollo.create({
      link,
      cache: new InMemoryCache()
    }, 'api');

  }

}

// TODO: Primeramente, la no autorización la redirecciono nuevamente al login. Forma provisional.
// TODO: Posteriormente, refrescar token una vez expirado de forma automática. Forma definitiva.