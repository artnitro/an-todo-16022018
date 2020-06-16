/**
 * Type definitions for query.
 */

import { gql } from 'apollo-server-express';

export const queryTypeDefs = gql`
  
  # Types for userProjects.

  type projectData {
    project: [String]
  }

  # Types for userData.

  type user {
    email: String
    project: [String]
  }

  # Queries.

  type Query {
    userProjects: projectData
    userData: [user]
  }

`;