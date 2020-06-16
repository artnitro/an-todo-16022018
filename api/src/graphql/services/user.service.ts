/**
 * User service.
 */

import { ApolloError } from 'apollo-server';

import { UserModel } from '../../model/user.model'

type IUser = {
  findAll(): Promise<any>,
  findOne(args: object): Promise<any>,
}

export const User: IUser = Object.create(Object.prototype);

/**
 * @description Get all users of database
 * @returns Promise
 */
User.findAll = async () => await UserModel.find();

/**
 * @description Find an user, If user don't exist, it create him
 * @param args object
 * @returns Promise
 */
User.findOne = async (args) => await UserModel.findOrCreate( args );
  