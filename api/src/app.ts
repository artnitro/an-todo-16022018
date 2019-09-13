/**
 * Bootstrapping app.
 */

import 'reflect-metadata';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';

const app: express.Application = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/api/v1/' });

app.listen({ port: process.env.PORT }, () => {
  console.log(`>>> Server says: Bootstrapping server, listening port: ${process.env.PORT}`);  
});