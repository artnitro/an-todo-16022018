/**
 * Type definitions for GraphQL.
 */

import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;