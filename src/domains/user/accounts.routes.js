import { Router } from 'express';
import { protectedAsyncRequestHandler } from '../../lib/util/protectedAsyncHandler';
import { accountService } from './accounts.service';

export function getAccountsRouter() {
  const accountsRouter = Router();

  accountsRouter.post(
    '/signup',
    protectedAsyncRequestHandler(async (req, res) => {
      await accountService.create(req.body);
      res.status(201).json({ message: 'account created' });
    }),
  );

  return accountsRouter;
}
