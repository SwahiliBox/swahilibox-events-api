import request from 'supertest'
import utils from '../../tests/utils'
import app from '../index'

describe('User routes e2e testing', () => {
  let user
  let api

  beforeEach(() => {
    api = () => request(app)
    user = utils.generators.createUserObject()
  })
  describe('Success', () => {
    test('should insert a user via api', () => {
      return api()
        .post('/signup')
        .send(user)
        .expect(201)
    })
    test.skip('should fail if user already exists', () => {
    })
  })
  describe('Failure', () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'password']
    requiredFields.forEach(requiredField => {
      test(`should fail if ${requiredField} is missing`, () => {
        delete user[requiredField]
        return api()
          .post('/signup')
          .send(user)
          .expect(400)
      })
    })
    test('should fail if firstName is not a string', () => {
      user.firstName = null
      const error = '{"message":"please povide a valid first name"}'
      return api()
        .post('/signup')
        .send(user)
        .expect(400, error)
    })
    test('should fail if lastName is not a string', () => {
      user.lastName = null
      const error = '{"message":"please povide a valid last name"}'
      return api()
        .post('/signup')
        .send(user)
        .expect(400, error)
    })
    test('should fial if email is invalid', () => {
      user.email = 'invalid-email'
      const error = '{"message":"please provide a valid email"}'
      return api()
        .post('/signup')
        .send(user)
        .expect(400, error)
    })
    test('should fail if email is not a string', () => {
      user.email = null
      const error = '{"message":"please provide a valid email"}'
      return api()
        .post('/signup')
        .send(user)
        .expect(400, error)
    })
    test('should fail if password is less than 6 chars long', () => {
      user.password = '1234'
      const error = '{"message":"password must have a minimum length of 6."}'
      return api()
        .post('/signup')
        .send(user)
        .expect(400, error)
    })
  })
})
