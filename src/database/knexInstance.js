import Knex from 'knex';
import knexStringCase from 'knex-stringcase';

import { getConfig } from '../config';
import configs from './knexfile';

const config = configs[getConfig().env];

if (!config) {
  throw new Error('Missing database config');
}

export const knexInstance = Knex(knexStringCase(config));
