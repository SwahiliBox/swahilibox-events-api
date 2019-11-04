import request from 'supertest';
import { describeDbTestSuite } from '../../test/describeDbTestSuite';
import appFactory from '../../app';
import { getAccountsRouter } from './accounts.routes';

describeDbTestSuite('accountsRouter', () => {
  const app = appFactory.createExpressApp();
  const accountsRouter = getAccountsRouter();
  app.use(accountsRouter);
  describe('create', () => {
    test('it should create an account successfully', async () => {
      const createAccountBody = {
        email: 'email@example.com',
        password: '0PasSwoRd12',
      };

      const response = await request(app)
        .post('/signup')
        .set('Content-type', 'application/json')
        .send(createAccountBody);
      expect(response.body).toEqual({
        message: 'account created',
      });
      expect(response.status).toEqual(201);
    });
  });
});
