/**
 * forgotpwd query.
 */

import gql from 'graphql-tag';

export const forgotPwd = gql`
  query forgotPwd($email: String!) {
    forgotPwd(forgotPwd: {email: $email})
  }
`;