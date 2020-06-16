/**
 * 
 */

import merge from 'deepmerge';

import { UserProjects } from './userprojects.resolver';
import { UserData } from './userdata.resolver';

export const Query = merge.all([ 
  UserProjects,
  UserData
]);

// console.log('>>> typeOf:', typeof Query);


