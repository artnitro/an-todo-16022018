/**
 * User interface.
 */

export interface IUser {
  findOne(args): Promise<any>;
  findOrCreate(args): Promise<any>;
}