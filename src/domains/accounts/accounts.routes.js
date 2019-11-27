import { Router } from 'express';
import { protectedAsyncRequestHandler } from '../../lib/util/protectedAsyncHandler';
import validateAuthData from '../../lib/middlewares/validateAuthData';
import { accountService } from './accounts.service';

const { localAuthentication } = require('../../lib/util/passportSetup');

export function getAccountsRouter() {
  const accountsRouter = Router();

  accountsRouter.post(
    '/signup',
    validateAuthData,
    protectedAsyncRequestHandler(async (req, res) => {
      const user = await accountService.create(req.body);
      res.status(201).json({ message: 'Account created', token: user.token });
    }),
  );

  accountsRouter.post(
    '/login',
    validateAuthData,
    localAuthentication,
    (req, res) => {
      const token = accountService.login(req.user);
      res.status(200).json({ message: 'Logged In successfully', token });
    },
  );

  return accountsRouter;
}
