/**
 * Resolvers for GraphQL
 */

// Carga de modelos para ver si da error. 

import { UserModel } from '../model/user.model';
import { ProjectModel } from '../model/project.model';

// console.log('Modelo User: ', UserModel);
// const Proyecto = ProjectModel('an-project');
// console.log('Modelo Proyecto:', Proyecto);

///////////////////////////////////////

// Carga dinámica de resolvers, query.

import merge from 'deepmerge'; //// Para unir objetos y arrays.
import { Query } from './query/query.resolver';


// console.log('>>> Resolver with Query: ', Query);

export const resolvers = Object.create(Object.prototype);
resolvers.Query = Query;

// console.log('>>> Resolvers: ', resolvers);

////////////////////////////////////