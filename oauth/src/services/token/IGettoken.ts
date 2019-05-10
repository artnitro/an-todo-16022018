/**
 * Get token interface.
 */

import { IUserData } from './IUserdata';

export interface IGetToken {
  getToken(userData: IUserData): string;
}