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

  async getUser(field, value) {
    const user = await knexInstance(ACCOUNTS_TABLE)
      .where(field, value)
      .first();
    return user;
  }
}

export const accountResource = new AccountResource();
