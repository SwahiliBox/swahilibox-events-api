import express from 'express'
import validateSignupData from '../../lib/middlewares/validateSignupData'
import { localAuthentication } from '../../config/passportSetup'

import UserController from '../controllers/userController'

const Router = express.Router()

Router.post('/signup', validateSignupData, UserController.signup)
Router.post('/login', localAuthentication, UserController.login)

export default Router
