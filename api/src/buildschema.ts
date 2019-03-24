/**
 * Build schema for graphQL.
 */

import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  interface IUser {
    firstname: String!
    lastname: String!
    email: String!
  }

  type CUser implements IUser {
    firstname: String!
    lastname: String!
    email: String!
    password: String
  }

  type Query {
    getUsers: [CUser!]! 
  }

`);