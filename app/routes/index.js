import HttpStatus from 'http-status'
import userRoutes from './user'
import errorHandler from '../../lib/middlewares/globalErrorHandler'

const routes = app => {
  app.use(userRoutes)

  app.get('/', (req, res) =>
    res
      .status(HttpStatus.OK)
      .json({ message: 'welcome to swahilibox events API' }),
  )

  app.use('*', (req, res) =>
    res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: 'path not found, please check and try again' }),
  )

  // Error handler middeware
  app.use(errorHandler)

  return app
}

export default routes
