/**
 * 
 */

import * as express from 'express';
import * as graphqlHttp from 'express-graphql';
import { buildSchema } from 'graphql';

import { schema } from './buildschema';
import { Resolvers } from './resolvers';

export class Router {

  route: express.Router;

  constructor() {
    this.route = express.Router();
  }

  routes() {

    this.route.get('/api/v1/', graphqlHttp({
      schema: schema,
      rootValue: Resolvers,
      graphiql: true
    }));
    
    this.route.post('/api/v1/', graphqlHttp({
      schema: schema,
      rootValue: Resolvers,
    }));

    return this.route;
  }

}

