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
      expect(response.body.message).toEqual('Account created');
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('message');
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
      expect(response.body).toEqual({
        message: 'please provide a valid email',
      });
      expect(response.body).toHaveProperty('message');
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
      expect(response.body).toEqual({
        message: 'password is required.',
      });
      expect(response.body).toHaveProperty('message');
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
      expect(response.body).toEqual({
        message: 'please provide a valid email',
      });
      expect(response.body).toHaveProperty('message');
      expect(response.status).toEqual(400);
    });

    test('it should not create an account with empty string email', async () => {
      const createAccountBody = {
        email: ' ',
        password: '0PasSwoRd12',
      };

      const response = await request(app)
        .post('/signup')
        .set('Content-type', 'application/json')
        .send(createAccountBody);
      expect(response.body).toEqual({
        message: 'please provide a valid email',
      });
      expect(response.body).toHaveProperty('message');
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
      expect(response.body).toEqual({
        message: 'password must have a minimum length of 6.',
      });
      expect(response.body).toHaveProperty('message');
      expect(response.status).toEqual(400);
    });

    test('it should not create an account with empty password', async () => {
      const createAccountBody = {
        email: 'email@example.com',
        password: ' ',
      };

      const response = await request(app)
        .post('/signup')
        .set('Content-type', 'application/json')
        .send(createAccountBody);
      expect(response.body).toEqual({
        message: 'password must have a minimum length of 6.',
      });
      expect(response.body).toHaveProperty('message');
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
      expect(response.body.message).toEqual('Logged In successfully');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('token');
      expect(response.status).toEqual(200);
    });
  });
});
