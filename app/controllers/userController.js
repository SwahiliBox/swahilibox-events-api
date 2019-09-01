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
}

export default UserController
