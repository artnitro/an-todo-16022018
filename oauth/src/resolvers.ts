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
  
  static isUser(args, { errorName, req, res }) {
    let
      email,
      { password } = args.isUser,
      mail = ({ email } = args.isUser, { email });

    // res.cookie('refresh', 'ValorDeRefrecoToken', {
    //   // domain: 'oauth.antodo.local',
    //   domain: 'antodo.local',
    //   // expires: new Date(Date.now() + 604800),
    //   maxAge: 604800000, // en MILISEGUNDOS
    //   // path: '/oauth/v1/',
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'strict'
    // });

    // // console.log('>>>> REPONSE', res);

    // console.log('>>>>>> COOKIES', req.cookies);

    return Resolvers.user
      .findOne(mail)
      .then( user => {
        return (user !== null && bcrypt.compareSync(password, user.dataValues.password))
          ? Resolvers.token.getToken({
              email: user.dataValues.email,
              firstName: user.dataValues.firstName
            }, parseInt(process.env.TOKEN_LIFE, 10)) 
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
        ? Resolvers.token.getToken({
            email: user.dataValues.email
          }, parseInt(process.env.FORGOT_LIFE, 10)) 
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
  
  static createUser(args , { errorName }) {
    let 
      email,
      mail = ({ email } = args.cuser, { email });

    return Resolvers.user
      .findOrCreate(args.cuser, mail)
      .then( user => {
        return (user === null)
          ? (() => { throw new Error(errorName.BAD_REQUEST); })()
          : (user === undefined)
            ? (() => { throw new Error(errorName.UNVALIDATED); })()
            : Resolvers.token.getToken({
                email: user.dataValues.email,
                firstName: user.dataValues.firstName
              }, parseInt(process.env.TOKEN_LIFE, 10)); 
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

}