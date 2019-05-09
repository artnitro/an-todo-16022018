/**
 * Resolvers for graphql.
 */

import { inject, injectable } from 'inversify';

import { models } from './model/mysql'; // Remove when I removed the getUser() method.
import { IUser } from './services/IUser';
import { TYPES } from './services/types';

@injectable()
export class Resolvers {

  static user: IUser;
  
  private constructor( @inject(TYPES.IUserId) private user: IUser ) {
    Resolvers.user = user;
  }

  static getUsers() {
    return models.User
      .findAll({})
      .then( users => {
        return users
      });
  }

  static isUser(args, { errorName }) {
    return Resolvers.user
      .findOne(args)
      .then( user => {
        return (user !== null)
          ? user
          : (() => { throw new Error(errorName.UNAUTHORIZED); })()
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
  
  static createUser(args , { errorName }) {
    return Resolvers.user
      .findOrCreate(args)
      .then( user => {
        return (user === null)
          ? (() => { throw new Error(errorName.BAD_REQUEST); })()
          : (user === undefined)
            ? (() => { throw new Error(errorName.UNVALIDATED); })()
            : user;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

}