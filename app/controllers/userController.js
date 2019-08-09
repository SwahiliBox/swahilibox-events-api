import UserService from '../services/userService'

class UserController {
  static async signup(req, res) {
    return UserService.createUser(req, res)
  }
}

export default UserController
