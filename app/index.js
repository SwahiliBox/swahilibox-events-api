const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')

const app = express()

app.use(bodyParser.json())
if (app.get('env') === 'development') {
  app.use(morgan('dev'))
}

routes(app)

module.exports = app
