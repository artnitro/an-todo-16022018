/**
 * Get all user data.
 */

import { ApolloError } from 'apollo-server';

import { User } from '../services/user.service';


export const UserData = Object.create(Object.prototype);
UserData.userData = (parent, args, context, info) => {
  
  let user: object;
  
  return User.findAll()
    .then( (data) => {
      return [ user ] = data;
    })
    .catch( err => {
      console.log('>>> Error;', err);
      throw new ApolloError('Internal Server Error', '501');
    });

}
