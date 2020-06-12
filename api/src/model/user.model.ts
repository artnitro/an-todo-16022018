/**
 * User model.
 */

import { plugin, prop, modelOptions, getModelForClass, defaultClasses } from '@typegoose/typegoose';
import findOrCreate from 'mongoose-findorcreate';

@plugin(findOrCreate)
@modelOptions({ schemaOptions: { timestamps: true } })
class User extends defaultClasses.FindOrCreate {

  @prop({ required: true, unique: true, index: true })
  public email!: string;

  @prop({ default: [], type: String })
  public project: string[]; 

}

export const UserModel = getModelForClass(User);
