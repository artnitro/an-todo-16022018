/**
 * GraphQl module.
 */

import { NgModule } from '@angular/core';

import { ApolloModule } from "apollo-angular";
import { HttpLinkModule } from "apollo-angular-link-http";

import { OauthModule } from './graphql-config/oath.module';
import { ApiModule } from './graphql-config/api.module';

@NgModule({
  imports: [
    ApolloModule, 
    HttpLinkModule,
    OauthModule,
    ApiModule,
  ]
})

export class GraphqlModule {}