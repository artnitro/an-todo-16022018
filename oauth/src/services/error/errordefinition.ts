/**
 * Error description.
 */

import { IErrorDefinition } from './IErrordefinition';

export const errorDefinition: IErrorDefinition = {
  BAD_REQUEST: {
    message: 'Bad request',
    statusCode: 400
  },
  UNAUTHORIZED: {
    message: 'Unauthorized User',
    statusCode: 401
  },
  UNVALIDATED: {
    message: 'Unvalidated data',
    statusCode: 419
  }
}