/**
 * Resolvers for graphql.
 */

import { inject, injectable } from 'inversify';

import { models } from './model/mysql'; // Remove when I removed the getUser() method.
import { IUser } from './services/IUser';
import { IToken } from './services/token/IToken';
import { TYPES } from './services/types';

@injectable()
export class Resolvers {

  static user: IUser;
  static token: IToken;
  
  private constructor ( 
    @inject(TYPES.IUserId) private user: IUser, 
    @inject(TYPES.ITokenId) private token: IToken
  ) {
    Resolvers.user = user;
    Resolvers.token = token;
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
      .findOne(args.isUser)
      .then( user => {
        return (user !== null)
          ? Resolvers.token.getToken({
              id: user.dataValues.uuid,
              email: user.dataValues.email
            }, 60) 
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
            : Resolvers.token.getToken({
                id: user.dataValues.uuid,
                email: user.dataValues.email
              }, 60); 
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

}