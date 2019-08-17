import uuid from 'uuid/v4'
import db from '../../database/models'
import encryptPassword from '../../lib/helpers/encrypt'
import CustomError from '../../lib/helpers/customError'
import createToken from '../../lib/helpers/jwtHelper'
import config from '../../config/config'

class UserService {
  static async createUser(user) {
    {
      const { firstName, lastName, email, password } = user
      const hashedPassword = encryptPassword.generateHash(password)
      const userData = {
        id: uuid(),
        firstName,
        lastName,
        email,
        password: hashedPassword,
      }
      const existingUser = await db.User.findOne({ where: { email } })

      if (existingUser) {
        throw new CustomError(409, 'email already exists')
      }
      return db.User.create(userData)
    }
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
