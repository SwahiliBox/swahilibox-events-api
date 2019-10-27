import path from 'path';

import { getConfig } from '../config';

const {
  env,
  db: { name, username, password, host },
} = getConfig();

const defaultOptions = {
  client: 'pg',
  connection: `postgresql://${username}:${password}@${host}/${name}`,
  migrations: {
    directory: path.join(__dirname, 'migrations'),
  },
};

const configs = {
  development: defaultOptions,
  staging: defaultOptions,
  production: defaultOptions,
  local: defaultOptions,
  test: defaultOptions,
};

if (configs[env] === undefined) {
  throw Error(`Missing configuration for environment: ${env}`);
}

module.exports = configs;
