/**
 * Resolvers for graphql.
 */

import * as bcrypt from 'bcryptjs';
import * as jwt from "jsonwebtoken";

import { models } from './model/mysql';

export class Resolvers {

  static getUsers() {
    return models.User
      .findAll({})
      .then( users => {
        return users
      });
  }

  static isUser(args) {
    return models.User
      .findOne({
        where: {
          email: args.isUser.email,
        }
      })
      .then( user => {
        return ( user !== null )
          ? bcrypt.compareSync(args.isUser.password, user.dataValues.password)
            ? jwt.sign(
                {
                  id: user.dataValues.uuid,
                  email: user.dataValues.email
                }, 
                process.env.JWT_SECRET, 
                {
                  expiresIn: 60
                } 
              ) 
            : new Error ('Error. User does not exist.')
          : new Error ('Error. User does not exist.');
      })
  }
  
  static createUser (args, context) {
    // console.log('>>> Context: ', context.headers);
    let salt = bcrypt.genSaltSync(10);
    args.cuser.password = bcrypt.hashSync(args.cuser.password, salt);

    return models.User
      .findOrCreate({
        where: {
          email: args.cuser.email
        }, 
        defaults: args.cuser
      })
      .spread( (userData, created) => {
        return (created) 
          ? jwt.sign(
              {
                id: userData.dataValues.uuid,
                email: userData.dataValues.email
              }, 
              process.env.JWT_SECRET, 
              {
                expiresIn: 60
              } 
            ) 
          : new Error('Error. User already exists.');
      });
  }

}