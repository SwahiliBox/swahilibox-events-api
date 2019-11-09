import { mockRequest, mockResponse } from 'mock-req-res';
import validateAuthData from './validateAuthData';

describe('#validateAuthData', () => {
  const validData = {
    email: 'joedoe@gmail.com',
    password: 'mypasswod123',
  };
  const invalidData = {
    email: 'joedoegmail.com',
    password: 'mypasswod123',
  };
  test('should return no erros if data is valid', () => {
    const next = jest.fn();
    const req = mockRequest({ body: validData });
    validateAuthData(req, mockResponse, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
  test('it should call res with correct status and message if data is not valid', () => {
    const next = jest.fn();
    const req = mockRequest({ body: invalidData });
    const res = mockResponse({
      status: jest.fn(),
      json: jest.fn(),
    });
    const mockStatus = jest.spyOn(res, 'status');
    const mockJson = jest.spyOn(res, 'json');
    validateAuthData(req, res, next);
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      message: 'please provide a valid email',
    });
  });
});
