/**
 * Resolvers for GraphQL
 */

import merge from 'deepmerge';

import { Query } from './query/query.resolver';
import { Mutation } from './mutation/mutation.resolver';


export const resolvers = Object.create(Object.prototype);

resolvers.Query = Query;
resolvers.Mutation = Mutation;
