/**
 * User interface.
 */

import { IFindOne } from './IFindone';
import { IFindOrCreate } from './IFindorcreate';
import { IUpdate } from './IUpdate';

export interface IUser extends IFindOne, IFindOrCreate, IUpdate {}
