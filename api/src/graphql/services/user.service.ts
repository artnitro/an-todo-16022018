/**
 * User service.
 */

import { ApolloError } from 'apollo-server';

import { UserModel } from '../../model/user.model'

type IUser = {
  findAll(): Promise<any>,
  findOne(args: object): Promise<any>,
  updatePersonalGroup(project: string, type: string, mail: object): Promise<any>,
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

/**
 * @description Update personal or group projects.
 * @param project string
 * @param type string
 * @param mail object
 * @returns Object
 */
User.updatePersonalGroup = async (project, type, mail) => {

  return await UserModel.updateOne(
    mail,
    {
      $push: {
        [type]: {
          $each : [project]
        }
      }
    }
  );

} 
