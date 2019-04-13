/**
 * Setup container.
 */

import { Container } from 'inversify';

import { IUser } from './services/IUser';
import { TYPES } from './services/types';
import { Resolvers }  from './resolvers';
import { UserService } from './services/user.service';

const container = new Container();

container.bind<IUser>(TYPES.IUserId).to(UserService).inSingletonScope();
container.bind<Resolvers>(Resolvers).toSelf();

export { container }