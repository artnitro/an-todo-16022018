/**
 * Resolvers for graphql.
 */

import { models } from './model/mysql';

export class Resolvers {

  static getUsers() {
    return models.User
      .findAll({})
      .then( users => {
        return users
      });
  }
  
}