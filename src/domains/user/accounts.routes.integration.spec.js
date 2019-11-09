import request from 'supertest';
import { describeDbTestSuite } from '../../test/describeDbTestSuite';
import appFactory from '../../app';
import { getAccountsRouter } from './accounts.routes';

describeDbTestSuite('accountsRouter', () => {
  const app = appFactory.createExpressApp();
  const accountsRouter = getAccountsRouter();
  app.use(accountsRouter);
  describe('Test user authentication', () => {
    test('it should create an account successfully', async () => {
      const createAccountBody = {
        email: 'email@example.com',
        password: '0PasSwoRd12',
      };

      const response = await request(app)
        .post('/signup')
        .set('Content-type', 'application/json')
        .send(createAccountBody);
      const { message, token } = response.body;
      expect(response.body).toEqual({
        message,
        token,
      });
      expect(response.status).toEqual(201);
    });

    test('it should not create an account without email', async () => {
      const createAccountBody = {
        password: '0PasSwoRd12',
      };

      const response = await request(app)
        .post('/signup')
        .set('Content-type', 'application/json')
        .send(createAccountBody);
      const { message } = response.body;
      expect(response.body).toEqual({
        message,
      });
      expect(response.status).toEqual(400);
    });

    test('it should not create an account without password', async () => {
      const createAccountBody = {
        email: 'email@example.com',
      };

      const response = await request(app)
        .post('/signup')
        .set('Content-type', 'application/json')
        .send(createAccountBody);
      const { message } = response.body;
      expect(response.body).toEqual({
        message,
      });
      expect(response.status).toEqual(400);
    });

    test('it should not create an account with invalid email', async () => {
      const createAccountBody = {
        email: 'emailexample.com',
        password: '0PasSwoRd12',
      };

      const response = await request(app)
        .post('/signup')
        .set('Content-type', 'application/json')
        .send(createAccountBody);
      const { message } = response.body;
      expect(response.body).toEqual({
        message,
      });
      expect(response.status).toEqual(400);
    });

    test('it should not create an account with short password', async () => {
      const createAccountBody = {
        email: 'email@example.com',
        password: '0Pas',
      };

      const response = await request(app)
        .post('/signup')
        .set('Content-type', 'application/json')
        .send(createAccountBody);
      const { message } = response.body;
      expect(response.body).toEqual({
        message,
      });
      expect(response.status).toEqual(400);
    });

    test('It should return invalid when login with wrong credential', async () => {
      const credentials = {
        email: 'wrong@example.com',
        password: 'wrongpass',
      };

      const response = await request(app)
        .post('/login')
        .set('Content-type', 'application/json')
        .send(credentials);
      const { message } = response.body;
      expect(response.body).toEqual({
        message,
      });
      expect(response.status).toEqual(400);
    });

    test('it should login user successfully', async () => {
      const createAccountBody = {
        email: 'email@example.com',
        password: '0PasSwoRd12',
      };
      await request(app)
        .post('/signup')
        .set('Content-type', 'application/json')
        .send(createAccountBody);

      const credentials = {
        email: 'email@example.com',
        password: '0PasSwoRd12',
      };

      const response = await request(app)
        .post('/login')
        .set('Content-type', 'application/json')
        .send(credentials);
      const { message, token } = response.body;
      expect(response.body).toEqual({
        message,
        token,
      });
      expect(response.status).toEqual(200);
    });
  });
});
