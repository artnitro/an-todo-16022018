/**
 * Setup container.
 */

import { Container } from 'inversify';

import { IUser } from './services/IUser';
import { IToken } from './services/token/IToken';
import { TYPES } from './services/types';
import { Resolvers }  from './resolvers';
import { UserService } from './services/user.service';
import { TokenService } from './services/token/token.service';

const container = new Container();

container.bind<IUser>(TYPES.IUserId).to(UserService).inSingletonScope();
container.bind<IToken>(TYPES.ITokenId).to(TokenService).inSingletonScope();
container.bind<Resolvers>(Resolvers).toSelf();

export { container }