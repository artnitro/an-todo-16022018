/**
 * Mongo service.
 */

import mongoose from 'mongoose';

import { URI, OPTIONS } from './mongo.config';

export class MongoService {

  static async connect(): Promise<any> {

    await  mongoose.connect(URI, OPTIONS);

  }
}