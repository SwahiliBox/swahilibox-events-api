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
}

export const accountResource = new AccountResource();
