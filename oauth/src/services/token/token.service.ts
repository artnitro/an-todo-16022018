/**
 * Token service.
 */

import { injectable } from 'inversify';
import * as jwt from "jsonwebtoken";

import { IToken } from './IToken';
import { IUserData } from './IUserdata';

@injectable()
export class TokenService implements IToken {

  getToken(userData: IUserData): string {
    return jwt.sign(
      userData, 
      process.env.JWT_SECRET, 
      {
        expiresIn: 60
      } 
    )
  }
}