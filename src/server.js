import logger from 'fancy-log';
import { getConfig } from './config';
import app from './app';

app.start(getConfig(), logger);
