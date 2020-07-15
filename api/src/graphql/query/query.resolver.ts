/**
 * 
 */

import merge from 'deepmerge';

import { UserProjects } from './userprojects.resolver';
import { UserData } from './userdata.resolver';
import { GetCollections } from './getcollections.resolver';

export const Query = merge.all([ 
  UserProjects,
  UserData,
  GetCollections
]);

// console.log('>>> typeOf:', typeof Query);


