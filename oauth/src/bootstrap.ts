/**
 * Bootstrap app.
 */

import * as http from 'http';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';

import { Router } from './router';

export class Bootstrap {

  app: express.Application;
  router: express.Router = new Router().routes();
  
  constructor() {
    this.app = express();
    this.initMiddleware()
  }
  
  private initMiddleware() {
    this.app.use(cookieParser());
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
                error: '500 Internal Server Error'
              });
    }); 
  }

}