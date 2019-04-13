/**
 * Routes for app.
 */

import 'reflect-metadata';

import * as express from 'express';
import * as graphqlHttp from 'express-graphql';

import { schema } from './buildschema';
import { Resolvers } from './resolvers';
import { container } from './container';

container.get<Resolvers>(Resolvers);

export class Router {

  route: express.Router;

  constructor() {
    this.route = express.Router();
  }

  routes() {

    this.route.get('/oauth/v1/', graphqlHttp({
      schema: schema,
      rootValue: Resolvers,
      graphiql: true
    }));
    
    this.route.post('/oauth/v1/', graphqlHttp( request => {
      return {
        schema: schema,
        rootValue: Resolvers,
        context: request
      }
    }));

    return this.route;
  }

}

