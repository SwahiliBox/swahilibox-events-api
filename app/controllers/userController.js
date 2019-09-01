import httpStatus from 'http-status'
import UserService from '../services/userService'
import responseWrapper from '../../lib/helpers/response-wrapper'

class UserController {
  static async signup(req, res, next) {
    await UserService.createUser(req.body)
      .then(user => {
        return { data: user }
      })
      .then(responseWrapper.respond({ res, status: httpStatus.CREATED }))
      .catch(next)
  }

  static login(req, res, next) {
    try {
      const token = UserService.login(req.user)
      return res.status(200).json({ message: 'login successful', token })
    } catch (error) {
      return next(error)
    }
  }
}

export default UserController
