import { mockRequest, mockResponse } from 'mock-req-res';
import validateSignupData from './validateSignupData';

describe('#validateSignupData', () => {
  const validData = {
    firstName: 'Joe',
    lastName: 'Doe',
    email: 'joedoe@gmail.com',
    password: 'mypasswod123',
  };
  const invalidData = {
    firstName: 'Joe',
    lastName: 'Doe',
    email: 'joedoegmail.com',
    password: 'mypasswod123',
  };
  test('should return no erros if data is valid', () => {
    const next = jest.fn();
    const req = mockRequest({ body: validData });
    validateSignupData(req, mockResponse, next);
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
    validateSignupData(req, res, next);
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      message: 'please provide a valid email',
    });
  });
});
