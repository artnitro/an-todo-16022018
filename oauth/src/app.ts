/**
 * Bootstrapping app.
 */

import * as http from 'http';
import * as express from 'express';

import { models, sequelize } from './model/mysql';
import { Router } from './router';

/**
 * Defining our app.
 */

class App {

  app: express.Application;
  router: express.Router = new Router().routes();

  constructor() {
    this.app = express();
    this.initMiddleware()
  }

  private initMiddleware() {
    this.app.use(this.router);
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction)  => {
      (err.code === 'ENOENT')
        ? res
            .status(404)
            .json({
              error: '404 Not Found'
            })
        : (process.env.NODE_ENV === 'development')
          ? res 
              .status(500)
              .json({
                error: '500 Internal Server Error' + err
              })
          : res
              .status(500)
              .json({
                error: '500 Internal Server Error' + err
              });
    }); 
  }
}

/**
 * Defining our server.
 */

const app: express.Application = new App().app;
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

