/**
 * Find or create interface.
 */

 export interface IFindOrCreate {
   findOrCreate(args, find): Promise<any>;
 }