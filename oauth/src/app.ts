/**
 * App.
 */

import * as http from 'http';

import { Bootstrap } from './bootstrap';
import { models, sequelize } from './model/mysql';

const app: any = new Bootstrap().app;
const server: any = http.createServer(app);

const onError = (err: any): void => {
  (err.code === 'EACCES') 
  ? 
    [
      console.error('>>> Server says: It is required elevated privileges'),
      process.exit(1)
    ]
  : (err.code === 'EADDRINUSE')
    ? 
      [
        console.error('>>> Server says: It is already in use'),
        process.exit(1)
      ]
    : 
      [
        console.error(`>>> Server says: ${err}`),
        process.exit(1)
      ]
}

sequelize.sync().then(() => {
  server.listen(process.env.PORT);
  console.info('>>> Server says: Bootstrapping server, listening port: ', process.env.PORT);
  server.on('error', onError);
});

