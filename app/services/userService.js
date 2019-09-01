import uuid from 'uuid/v4'

import db from '../../database/models'
import encryptPassword from '../../lib/helpers/encrypt'
import CustomError from '../../lib/helpers/customError'

const ensureUserDoesNotExist = async user => {
  const foundUser = await db.User.findOne({ where: { email: user.email } })
  if (foundUser === null) return user
  throw new CustomError(402, 'user already exists')
}

const saveUser = user => db.User.create(user)

const createUserObjectToSave = user =>
  new Promise(resolve => {
    resolve(
      Object.assign(
        {},
        {
          id: uuid(),
          password: encryptPassword.generateHash(user.password),
          ...user,
        },
      ),
    )
  })

class UserService {
  static async createUser(user) {
    createUserObjectToSave(user)
      .then(ensureUserDoesNotExist)
      .then(saveUser)
      .catch(err => {
        throw err
      })
  }
}

export default UserService
