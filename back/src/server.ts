/* eslint-disable prettier/prettier */
import config from "./config";

import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import logger from "./common/logger";

import { createServer } from "http";
import { Route } from "./interfaces/route";
import { errorHandler } from "./api/middlewares/error-handler";
import { requestLogger } from "./api/middlewares/request-logger";
import mongoose from 'mongoose';
const app = express();


export class Server {
  constructor() {
    // Setup basic middlewares for parsing, security and performance
    app.use(helmet());
    app.use(compression());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }

  async connectMongoo() {
    try {
      await mongoose.connect(<string>process.env.MONGODBURI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }) ;
      console.log('connected to database');
  
    } catch (error) {
      console.log(error);
    }
  
  }
  /**
   * Add routes to the Express Server.
   * @param routes
   */
  addRoutes(routes: Route[], prefix = "/api") {
    // Setup request logger
    app.use(requestLogger);

    for (const route of routes) {
      const { method, path, handler, setPrefix } = route;

      if (setPrefix) (app as any)[method](prefix + path, handler);
      else (app as any)[method](path, handler);
    }

    // Setup error handler
    app.use(errorHandler);
  }

  /**
   * Start the Express Server.
   */
  start(): Application {
    const onStart = (port: number) => () =>
      logger.info(`Server running on port ${port}`);

    createServer(app).listen(config.port, onStart(config.port));
    return app;
  }
}
