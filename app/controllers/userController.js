import uuid from 'uuid/v4'
import db from '../../database/models'
import validateSignupData from '../../lib/helpers/validateSignupData'
import encryptPassword from '../../lib/helpers/encrypt'

class UserController {
  static async signup(req, res) {
    const errors = validateSignupData(req.body)
    // eslint-disable-next-line no-console
    console.log(errors)

    if (errors.length) {
      return res.status(400).json({ message: errors[0].message })
    }

    // eslint-disable-next-line camelcase
    const { first_name, last_name, email, password } = req.body
    const hashedPassword = encryptPassword.generateHash(password)
    const userData = {
      id: uuid(),
      firstName: first_name,
      lastName: last_name,
      email,
      password: hashedPassword,
    }
    try {
      const user = await db.User.findOne({ where: { email } })

      if (user) {
        return res.status(409).json({ message: 'email already exists' })
      }
      await db.User.create(userData)
      return res.json({ message: 'a user attempted to signup to the app' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export default UserController
