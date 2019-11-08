import { knexInstance } from '../../database/knexInstance';

const ACCOUNTS_TABLE = 'accounts';

class AccountResource {
  async create(createAccountBody) {
    const created = await knexInstance(ACCOUNTS_TABLE).insert(
      createAccountBody,
      '*',
    );
    return created[0];
  }

  async getUser(lookupKey, lookup) {
    const user = await knexInstance(ACCOUNTS_TABLE)
      .where(lookupKey, lookup)
      .first();
    return user;
  }
}

export const accountResource = new AccountResource();
