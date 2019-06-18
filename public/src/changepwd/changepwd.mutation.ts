/**
 * Change password mutation.
 */

import gql from 'graphql-tag';

export const changePwd = gql`
  mutation changePwd($email: String!, $password: String!) {
    changePwd(changePwd:{email: $email, password: $password})
  }
`;
