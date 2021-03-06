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
  
  input CUserInput {
    firstname: String!
    lastname: String!
    email: String!
    password: String
  }

  input IsUserInput {
    email: String!
    password: String!
  }

  input ForgotPwdInput {
    email: String!
  }

  input ChangepwdInput {
    email: String!
    password: String!
  }

  type Query {
    getUsers: [CUser!]!
    isUser(isUser: IsUserInput): String
    forgotPwd(forgotPwd: ForgotPwdInput): String
  }

  type Mutation {
    createUser(cuser: CUserInput): String
    changePwd(changePwd: ChangepwdInput): Boolean
  }
`);