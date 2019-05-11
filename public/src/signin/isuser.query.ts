/**
 * isUser query.
 */

import gql from 'graphql-tag';

export const isUser = gql`
  query isUser($email: String!, $password: String!) {
    isUser(isUser: {email: $email, password: $password})
  }
`;