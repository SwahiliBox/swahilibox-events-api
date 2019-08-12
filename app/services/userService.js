import uuid from 'uuid/v4'
import db from '../../database/models'
import encryptPassword from '../../lib/helpers/encrypt'
import CustomError from '../../lib/helpers/customError'

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
}

export default UserService
