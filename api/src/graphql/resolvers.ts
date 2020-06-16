/**
 * Resolvers for GraphQL
 */

import merge from 'deepmerge';

import { Query } from './query/query.resolver';

export const resolvers = Object.create(Object.prototype);
resolvers.Query = Query;