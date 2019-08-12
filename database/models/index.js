import Sequelize from 'sequelize'
import * as path from 'path'
import * as fs from 'fs'
import config from '../../config/config'
import dbConfig from '../../config/database'

const envDbConfig = dbConfig[config.env]
const db = {}
const basename = path.basename(__filename)

const sequelize = new Sequelize(
  envDbConfig.database,
  envDbConfig.username,
  envDbConfig.password,
  {
    host: envDbConfig.host,
    dialect: envDbConfig.dialect,
    logging: config.env === 'development',
  },
)

// Load each model file
fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach(file => {
    // eslint-disable-next-line
    const model = require(path.join(__dirname, file))
    // eslint-enable-next-line
    db[model.name] = model.init(sequelize)
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
