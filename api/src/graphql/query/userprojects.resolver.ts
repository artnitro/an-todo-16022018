/**
 * Get projects of user.  
 */

import { ApolloError } from 'apollo-server';

import { User } from '../services/user.service';


export const UserProjects = Object.create(Object.prototype);

UserProjects.userProjects = (parent, args, context, info) => {

  let
    email,
    mail = ({ email } = context.user, { email });

  return User.findOne(mail)
    .then( (projects) => ({
      personals: projects.doc.personals,
      groups: projects.doc.groups

    }))
    .catch( err => {
      console.log('>>> ERROR:', err);
      throw new ApolloError('Internal Server Error', '500');
    })

}
