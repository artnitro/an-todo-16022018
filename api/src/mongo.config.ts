/**
 * Mongo configuration.
 */

import mongoose from 'mongoose';
 
const URI: string = `mongodb://${process.env.USER_MONGODB}:${process.env.PASSWORD_MONGODB}@${process.env.HOST_MONGODB}:${process.env.PORT_MONGODB}/${process.env.DATA_BASE_NAME}`;
const OPTIONS: object = {
  autoIndex: false,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 5,
  useUnifiedTopology: true
};

export const mongo = async () => {
  await  mongoose.connect(URI, OPTIONS);
}