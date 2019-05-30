import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import routes from './routes'

const app = express()

app.use(bodyParser.json())
if (app.get('env') === 'development') {
  app.use(morgan('dev'))
}

routes(app)

export default app
