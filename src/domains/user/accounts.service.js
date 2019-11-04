import EncryptData from '../../lib/helpers/encrypt';
import { accountResource } from './accounts.resource';

class AccountService {
  async create(createAccountBody) {
    const { email, password } = createAccountBody;
    const encryptedPassword = EncryptData.generateHash(password);
    const createdAccount = await accountResource.create({
      email,
      password: encryptedPassword,
    });

    return createdAccount;
  }
}

export const accountService = new AccountService();
