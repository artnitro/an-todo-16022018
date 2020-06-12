/**
 * Project model.
 */

import mongoose from 'mongoose';
import { plugin, prop, modelOptions, buildSchema, addModelToTypegoose, defaultClasses } from '@typegoose/typegoose';
import findOrCreate from 'mongoose-findorcreate';

@plugin(findOrCreate)
@modelOptions({ schemaOptions: { timestamps: true } })
class Project extends defaultClasses.FindOrCreate {
  
  @prop({ required: true, unique: true })
  public board: string;

  @prop({ required: true })
  public email: string;

  @prop({ default: [], type: Number})
  public level?: number[];

  @prop({ default: [], type: String })
  public data?: string[];

}

const projectSchema = buildSchema(Project);

export const ProjectModel = (name: string) => { 
  // return getModelForClass(Project);
  return addModelToTypegoose(mongoose.model(name, projectSchema), Project)
}

