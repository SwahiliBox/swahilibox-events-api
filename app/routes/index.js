import HttpStatus from 'http-status'
import userRoutes from './user'

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
  return app
}

export default routes
