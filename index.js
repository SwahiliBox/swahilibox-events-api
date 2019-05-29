const logger = require('fancy-log')
const { port } = require('./config/config')
const app = require('./app')

app.listen(port, () => {
  logger.info(`app running on port ${port}`)
})
