/**
 * Type definitions for query.
 */

import { gql } from 'apollo-server-express';

export const queryTypeDefs = gql`
  
  # Types for userProjects.

  type projectData {
    personals: [String]
    groups: [String]
  }

  # Types for userData.

  type user {
    email: String
    personals: [String]
    groups: [String]
  }

  # Queries.

  type Query {
    userProjects: projectData
    userData: [user]
    getCollections: [String]
  }

`;