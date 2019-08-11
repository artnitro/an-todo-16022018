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
  
  static isUser(args, { errorName, res }) {
    let
      email,
      token,
      { password } = args.isUser,
      mail = ({ email } = args.isUser, { email });

    token = Resolvers.user
      .findOne(mail)
      .then( user => {
        if ( user !== null && bcrypt.compareSync(password, user.dataValues.password) ) {
          res.cookie('refresh-token', user.dataValues.uuid, {
            domain: 'antodo.local',
            maxAge: parseInt(process.env.REFRESH_TOKEN,10), 
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
          });
          return  Resolvers.token.getToken({
                    email: user.dataValues.email,
                    firstName: user.dataValues.firstname
                  }, parseInt(process.env.TOKEN_LIFE, 10));

        } else {
          throw new Error(errorName.UNAUTHORIZED);
        }
      })
      .catch(err => {
        console.log(err);
        return err;
      });

      return token;
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
  
  static createUser(args , { errorName, res }) {
    let 
      email,
      token,
      mail = ({ email } = args.cuser, { email });

    token = Resolvers.user
      .findOrCreate(args.cuser, mail)
      .then( user => { 
        if ( user === null ) {
          throw new Error(errorName.BAD_REQUEST);
        } else if ( user === undefined ) {
          throw new Error(errorName.UNVALIDATED);
        } else {
          res.cookie('refresh-token', user.dataValues.uuid, {
            domain: 'antodo.local',
            maxAge: parseInt(process.env.REFRESH_TOKEN,10), 
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
          });
          return  Resolvers.token.getToken({
                    email: user.dataValues.email,
                    firstName: user.dataValues.firstname
                  }, parseInt(process.env.TOKEN_LIFE, 10)); 
        }
      })
      .catch(err => {
        console.log(err);
        return err;
      });

      return token;
  }
  // TODO: Crear servicio para la creación de Cookies.
  // TODO: Crear conexión con Redis para grabar refresh-token en database junto con expiresIn para tener control sobre cuando expiran.
  // TODO: Tener en cuenta que tengo que comprobar refresh-token recibido con refresh-token almacenado como validación.
  // TODO: Crear servicio que controle cada cierto tiempo, cuando establezca el expiresIn definitivo de refresh-token y token_life, la eliminación items caducados de Redis.
  // TODO: Establecer expiresIN definitivos para token_life y refresh_token.
  // TODO: Obviamente tendré que hacer el método para refresh-token.
}