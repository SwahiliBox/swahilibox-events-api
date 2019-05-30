import HttpStatus from 'http-status'

const routes = app => {
  // pass the routes to the app for use
  // e.g app.use('/events', eventsRoutes);
  app.get('/', (req, res) => res.status(HttpStatus.OK).json({ message : 'welcome to swahilibox events API' }))
  //any route apart from the above defined
  //this should be the last one, any route after it won't execute
  app.use('*', (req, res) => res.status(HttpStatus.NOT_FOUND).json({ message:'path not found, please check and try again' }))
  return app
}

export default routes
