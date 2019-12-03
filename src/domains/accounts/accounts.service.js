import EncryptData from '../../lib/helpers/encrypt';
import createToken from '../../lib/helpers/jwtHelper';
import CustomError from '../../lib/util/customError';
import { getConfig } from '../../config';

import { accountResource } from './accounts.resource';

const config = getConfig();

class AccountService {
  async create(createAccountBody) {
    const { email, password } = createAccountBody;
    const existingUser = await accountResource.getUser('email', email);
    if (existingUser) {
      throw new CustomError(401, 'User already exists');
    }
    const encryptedPassword = EncryptData.generateHash(password);
    const createdAccount = await accountResource.create({
      email,
      password: encryptedPassword,
    });

    const token = createToken({ id: createdAccount.id }, config.secretKey);

    const registeredUser = {
      ...createdAccount,
      token,
    };

    return registeredUser;
  }

  login(user) {
    const { id } = user;
    const token = createToken({ id }, config.secretKey);
    return token;
  }
}

export const accountService = new AccountService();
