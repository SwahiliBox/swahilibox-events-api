import express from 'express'
import morgan from 'morgan'
import routes from './routes'

const app = express()

app.use(express.json())
if (app.get('env') === 'development') {
  app.use(morgan('dev'))
}

routes(app)

export default app
  