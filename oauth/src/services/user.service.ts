/**
 * User service.
 */

import * as bcrypt from 'bcryptjs';
import { injectable } from 'inversify';

import { models } from '../model/mysql';
import { IUser } from './IUser';

@injectable()
export class UserService implements IUser {

  /**
   * @description It finds an user in database.
   * @param {object} args
   * @returns object or null.
   */
  async findOne(args) {
    try {
      let user = await models.User
        .findOne({
          where: {
            email: args.email,
          }
        })
      return ( user !== null && bcrypt.compareSync(args.password, user.dataValues.password) )
        ? user
        : (() => { throw new Error('Database error: User does not exist'); })()    
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /**
   * @description It creates an user if the user does not exist.
   * @param {object} args
   * @returns object, undefined or null.
   */
  async findOrCreate(args) {
    let salt = bcrypt.genSaltSync(10);
    args.cuser.password = bcrypt.hashSync(args.cuser.password, salt);

    try {
      let user = await models.User
        .findOrCreate({
          where: {
            email: args.cuser.email
          }, 
          defaults: args.cuser
        })
        .spread( (userData, created) => {
          return (created)  
            ? userData
            : (() => { throw new Error('Database error: User already exists') })()
        });
      return user;
    } catch (err) {
      console.log(err);
      return (err.name === 'SequelizeValidationError') ? undefined : null;
    }
  }

}