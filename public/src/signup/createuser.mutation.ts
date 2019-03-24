/**
 * createUser mutation.
 */

import gql from 'graphql-tag';

export const createUser = gql`
  mutation createUser($firstname: String!, $lastname: String!, $email: String!, $password: String!) {
    createUser(cuser:{firstname: $firstname, lastname: $lastname , email: $email, password: $password})
  }
`;