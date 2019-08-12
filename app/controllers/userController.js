import UserService from '../services/userService'

class UserController {
  static async signup(req, res, next) {
    try {
      await UserService.createUser(req.body)
      return res.status(201).json({ message: 'signup successful' })
    } catch (error) {
      return next(error)
    }
  }
}

export default UserController
