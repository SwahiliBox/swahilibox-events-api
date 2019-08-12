import express from 'express'
import morgan from 'morgan'
import routes from './routes'
import errorHandler from '../lib/middlewares/globalErrorHandler'

const app = express()

app.use(express.json())
if (app.get('env') === 'development') {
  app.use(morgan('dev'))
}

routes(app)
app.use(errorHandler)

export default app
