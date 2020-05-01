/**
 * Bootstrapping app.
 */

import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer, ApolloError } from 'apollo-server-express';
import http from 'http';
import jwt from 'jsonwebtoken';

import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';

import { mongo } from './mongo.config';

// Server config.

const app: express.Application = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  subscriptions: {
    path: '/api/v1/', 
    onConnect: ( connectionParams, webSokect, context ) => {
      // connectionParams son los parámetros que se envían de apollo client en la conexión websocket.
      // webSocket es la información enviada al servidor y propiedades de este servidor.
      console.log('>>> Connected websocker.');
    }, 
    onDisconnect: (webSocket, context) => {
      console.log('>>> Disconnected websocket');
    }
  },
  context: ({ req, connection }) => {
    try {
      // TODO: Verificar connection cuando tenga subscriptions, ya que se gestiona el contexto a través de connection con subscription.
      let token = req.headers.authorization.toString().replace('Bearer ', '') || '';
      let user = jwt.verify(token, process.env.JWT_SECRET);
      // console.log('>>>>> USER: ', user);
      return { user };
    } catch (error) {
      console.log('>>> Error: ', error);
      throw new ApolloError('Unauthorized User', '401');
    }
  }
});

server.applyMiddleware({ app, path: '/api/v1/' });
server.installSubscriptionHandlers(httpServer);

// Connect MongoDB and server bootstrap.

mongo().then(
  () => {
    console.log('>>>> Mongo connected');
    httpServer.listen({ port: process.env.PORT }, () => {
      console.log(`>>> Server says: Bootstraping server, listening port: ${process.env.PORT}`);
      console.log(`>>> Server says: Subscriptions ready, listening port: ${process.env.PORT}`);
    });
  },
  (err) => {
    console.log('>>> Error MongoDB: ', err);
  }
)