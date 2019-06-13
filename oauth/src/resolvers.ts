/**
 * Resolvers for graphql.
 */

import { inject, injectable } from 'inversify';
import * as bcrypt from 'bcryptjs';

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
    let
      email,
      { password } = args.isUser,
      mail = ({ email } = args.isUser, { email });

    return Resolvers.user
      .findOne(mail)
      .then( user => {
        return (user !== null && bcrypt.compareSync(password, user.dataValues.password))
          // Expira en 7 días.
          ? Resolvers.token.getToken({
              id: user.dataValues.uuid,
              email: user.dataValues.email
            }, 604800) 
          : (() => { throw new Error(errorName.UNAUTHORIZED); })()
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  static forgotPwd(args, { errorName }) {
    let 
      email,
      mail = ({ email } = args.forgotPwd, { email });

    return Resolvers.user
      .findOne(mail)
      .then( user => {
        return (user !== null) 
        // Expira en 30'.
        ? Resolvers.token.getToken({
            email: user.dataValues.email
          }, 1800) 
        : (() => { throw new Error(errorName.UNAUTHORIZED); })()
      })
      .catch(err => {
        console.log(err);
        return err;
      })
  }

  static changePwd(args, { errorName }) {
    let 
      email,
      mail = ({ email } = args.changePwd, { email }),
      salt = bcrypt.genSaltSync(10);

    args.changePwd.password = bcrypt.hashSync(args.changePwd.password, salt);
    return Resolvers.user
      .update(args.changePwd, mail)
      .then( user => {
        return (user) 
          ? true
          : (() => { throw new Error(errorName.BAD_REQUEST); })()
      })
      .catch( err => {
        console.log(err);
        return err;
      })
  }
  
  //TODO: Pasar parámetro find para indicar por lo que se va a buscar.
  static createUser(args , { errorName }) {
    return Resolvers.user
      .findOrCreate(args.cuser)
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