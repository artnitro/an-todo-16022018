/**
 * User service.
 */

import * as bcrypt from 'bcryptjs';
import * as jwt from "jsonwebtoken";
import { injectable } from 'inversify';

import { models } from '../model/mysql';
import { IUser } from './IUser';

@injectable()
export class UserService implements IUser {

  async findOne(args) {
    try {
      let user = await models.User
        .findOne({
          where: {
            email: args.isUser.email,
          }
        })
      return ( user !== null )
        ? bcrypt.compareSync(args.isUser.password, user.dataValues.password)
          ? this.createToken(user) 
          : new Error ('Error. User does not exist.')
        : new Error ('Error. User does not exist.');
    } catch (err) {
      console.log('System error: ', err);
      new Error ('System error, consult with your provider');
    }
  }

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
            ? this.createToken(userData) 
            : new Error('Error. User already exists.');
        });
      return user;
    } catch (err) {
      console.log('System error: ', err);
      new Error ('System error, consult with your provider');
    }
  }

  private createToken(userData): string {
    return jwt.sign(
      {
        id: userData.dataValues.uuid,
        email: userData.dataValues.email
      }, 
      process.env.JWT_SECRET, 
      {
        expiresIn: 60
      } 
    )
  }

}