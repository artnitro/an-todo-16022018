/**
 * User service.
 */

import { injectable } from 'inversify';

import { models } from '../model/mysql';
import { IUser } from './IUser';

@injectable()
export class UserService implements IUser {

  /**
   * @description Find an user in database.
   * @param find object
   * @returns object | null
   */
  async findOne(find) {
    try {
      let user = await models.User
        .findOne({
          where: find
        })
      return ( user !== null )
        ? user
        : (() => { throw new Error('Database error: User does not exist'); })()    
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /**
   * @description Create an user if the user does not exist.
   * @param args object
   * @param find object
   * @returns object | undefined | null.
   */
  async findOrCreate(args, find) {
    try {
      let user = await models.User
        .findOrCreate({
          where: find, 
          defaults: args
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

  /**
   * @description Update one or several columns.
   * @param cols object
   * @param find object
   * @returns boolean
   */
  async update(cols, find) {
    try {
      let user = await models.User
        .update(
          cols,
          {
            where: find
        });
      return (user[0] > 0 )
        ? true 
        : (() => { throw new Error('Database error: Error updating data') })()
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}