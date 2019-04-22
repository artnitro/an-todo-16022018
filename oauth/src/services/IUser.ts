/**
 * User interface.
 */

import { IFindOne } from './IFindone';
import { IFindOrCreate } from './IFindorcreate';

export interface IUser extends IFindOne, IFindOrCreate {}