import logger from 'fancy-log'
import config from './config/config'
import app from './app'

const { port } = config
app.listen(port, () => {
  logger.info(`app running on port ${port}`)
})
