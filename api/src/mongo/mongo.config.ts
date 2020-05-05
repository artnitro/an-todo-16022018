/**
 * Mongo configuration.
 */

 
export const URI: string = `mongodb://${process.env.USER_MONGODB}:${process.env.PASSWORD_MONGODB}@${process.env.HOST_MONGODB}:${process.env.PORT_MONGODB}/${process.env.DATA_BASE_NAME}`;

export const OPTIONS: object = {
  autoIndex: false,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 5,
  useUnifiedTopology: true
};
