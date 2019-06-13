/**
 * Update interface.
 */

export interface IUpdate {
  update(field, find): Promise<any>;
}