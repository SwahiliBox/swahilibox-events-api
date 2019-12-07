// eslint-disable-next-line
import request from 'supertest';
import appFactory from '../app';

const app = appFactory.createExpressApp();
export const makeApiCall = async (route, method, payload) => {
  return request(app)
    [method](`/${route}`)
    .set('Content-type', 'application/json')
    .send(payload);
};
