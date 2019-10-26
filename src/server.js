import logger from 'fancy-log';
import config from './config';
import app from './app';

app.start(config, logger);
