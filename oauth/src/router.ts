/**
 * Routes for app.
 */

import 'reflect-metadata';

import * as express from 'express';
import * as graphqlHttp from 'express-graphql';

import { schema } from './buildschema';
import { Resolvers } from './resolvers';
import { container } from './container';

import { errorName } from './services/error/errorname';
import { errorDefinition } from './services/error/errordefinition';

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
    
    this.route.post('/oauth/v1/', graphqlHttp( (request, response) => {
      return {
        schema: schema,
        rootValue: Resolvers,
        context: {
          req: request,
          res: response,
          errorName: errorName
        },
        formatError: (err) => {
          return errorDefinition[err.message];
        }
      }
    }));

    return this.route;
  }

}

