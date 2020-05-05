/**
 * Mongo service.
 */

import mongoose from 'mongoose';

import { URI, OPTIONS } from './mongo.config';

export class MongoService {

  static async connect() {

    await  mongoose.connect(URI, OPTIONS);

  }
}