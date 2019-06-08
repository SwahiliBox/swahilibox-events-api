const config = require('./config')

const defaultConfig = {
  database: config.databaseName,
  username: config.dbUsername,
  password: config.dbPassword,
  host: config.host,
  dialect: config.databaseDialect,
  port: config.databasePort,
}

if (config.databaseUrl) {
  // In heroku
  // Postgres connection string format: postgresql://[user[:password]@][netloc][:port][/dbname]
  const splitDbUrl = config.databaseUrl.split('://')
  // database dialect
  const dbDialect = splitDbUrl[0]
  // get credentials
  const dbCredentials = splitDbUrl[1].split(':')
  // get username, password, e.t.c from the credentials
  const dbUsername = dbCredentials[0]
  const dbPasswordAndHost = dbCredentials[1].split('@')
  const dbPassword = dbPasswordAndHost[0]
  const dbHost = dbPasswordAndHost[1]
  const dbPortAndDatabase = dbCredentials[2].split('/')
  const dbPort = dbPortAndDatabase[0]
  const dbName = dbPortAndDatabase[1]

  defaultConfig.database = dbName
  defaultConfig.username = dbUsername
  defaultConfig.password = dbPassword
  defaultConfig.host = dbHost
  defaultConfig.dialect = dbDialect
  defaultConfig.port = dbPort
}

const database = {
  development: {
    ...defaultConfig,
  },
  test: {
    ...defaultConfig,
    database: config.testDbName,
  },
  production: {
    ...defaultConfig,
  },
}

module.exports = database
