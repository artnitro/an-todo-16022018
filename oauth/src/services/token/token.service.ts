/**
 * Token service.
 */

import { injectable } from 'inversify';
import * as jwt from "jsonwebtoken";

import { IToken } from './IToken';
import { IUserData } from './IUserdata';

@injectable()
export class TokenService implements IToken {

  /**
   * @description Get token from user data.
   * @param {object} userData 
   * @param {number} time 
   * @returns string
   */
  getToken(userData: IUserData, time: number): string {
    return jwt.sign(
      userData, 
      process.env.JWT_SECRET, 
      {
        expiresIn: time
      } 
    )
  }
}