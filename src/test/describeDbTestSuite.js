import knexCleaner from 'knex-cleaner';
import { getConfig } from '../config';
import { knexInstance } from '../database/knexInstance';
import configs from '../database/knexfile';

const envConfig = getConfig();

if (envConfig.env !== 'test' || envConfig.db.name !== 'sb-events-test') {
  throw Error('Not in test environment');
}

const config = configs[envConfig.env];

const knexCleanerOptions = {
  ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
};

// this takes a function with the tests, runs all the necessary db setup and clean up,
// then calls the function to run the tests
export function describeDbTestSuite(name, func) {
  describe(name, () => {
    beforeAll(async () => {
      await knexInstance.migrate.rollback(config.migrations, true);
      await knexInstance.migrate.latest(config.migrations);
    });

    beforeEach(async () => {
      await knexCleaner.clean(knexInstance, knexCleanerOptions);
    });

    afterEach(async () => {
      await knexCleaner.clean(knexInstance, knexCleanerOptions);
    });

    afterAll(async () => {
      await knexInstance.migrate.rollback(config.migrations, true);
    });

    func(knexInstance);
  });
}
