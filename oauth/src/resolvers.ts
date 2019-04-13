/**
 * Resolvers for graphql.
 */

import { inject, injectable } from 'inversify';

import { models } from './model/mysql'; // Remove when I removed the getUser() method.
import { IUser } from './services/IUser';
import { TYPES } from './services/types';

@injectable()
export class Resolvers {

  static _user: IUser;
  
  private constructor( @inject(TYPES.IUserId) private user: IUser ) {
    Resolvers._user = user;
  }

  static getUsers() {
    return models.User
      .findAll({})
      .then( users => {
        return users
      });
  }

  static isUser(args) {
    return Resolvers._user.findOne(args)
      .then( user => user )
      .catch( err => {
        console.log('>>>>> Error: ', err);
        return new Error(err);
      })
  }

  /*
    static createUser(arg, context) {
      console.log('>>> Context: ', context.headers);
    }
  */
  
  static createUser(args) {
    return Resolvers._user.findOrCreate(args)
      .then( user => user )
      .catch( err => {
        console.log('>>>>> Error: ', err);
        return new Error(err);
      })
  }

}