import uuid from 'uuid/v4'

import db from '../../database/models'
import encryptPassword from '../../lib/helpers/encrypt'
import CustomError from '../../lib/helpers/customError'
import createToken from '../../lib/helpers/jwtHelper'
import config from '../../config/config'

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

  static login(user) {
    const { secretKey, jwtExpiration } = config
    const { id } = user
    const token = createToken({ id }, secretKey, {
      expiresIn: jwtExpiration,
    })
    return token
  }
}

export default UserService
