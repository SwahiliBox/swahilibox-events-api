import express from 'express';

import UserController from '../controllers/userController';

const Router = express.Router();

Router.post('/signup', UserController.signup) 

export default Router;