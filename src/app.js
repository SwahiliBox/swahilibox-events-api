import express from 'express';
import morgan from 'morgan';
import errorHandler from './lib/middlewares/globalErrorHandler';
import { getAccountsRouter } from './domains/user/accounts.routes';

class App {
  routes = [];

  createExpressApp() {
    const app = express();
    app.use(express.json());

    if (app.get('env') === 'development') {
      app.use(morgan('dev'));
    }

    // errorHandler should be added as the last middleware to the app
    app.use(errorHandler);

    return app;
  }

  addApiRoute(route) {
    this.routes.push(route);
    return this;
  }

  start(config, logger) {
    const app = this.createExpressApp();

    this.addApiRoute(getAccountsRouter());

    if (this.routes.length !== 0) {
      this.routes.forEach(route => {
        app.use(route);
      });
    }

    // create app server and start it
    app.listen(config.port, () => {
      logger.info(`app running on part ${config.port}`);
    });
  }
}

const app = new App();
export default app;
