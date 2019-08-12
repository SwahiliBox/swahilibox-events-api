import express from 'express'
import validateSignupData from '../../lib/middlewares/validateSignupData'

import UserController from '../controllers/userController'

const Router = express.Router()

Router.post('/signup', validateSignupData, UserController.signup)

export default Router
