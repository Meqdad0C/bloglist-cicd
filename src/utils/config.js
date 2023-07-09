require('dotenv').config()

const PORT = process.env.PORT || 3003
const env = process.env.NODE_ENV
const MONGODB_URI =
  env === 'test'
    ? process.env.MONGODB_URI_TEST
    : env === 'development'
      ? process.env.MONGODB_URI_LOCAL
      : process.env.MONGODB_URI_PROD

const jwt_config = {
  secret: process.env.SECRET,
  algorithms: ['HS256'],
  credentialsRequired: false,
}

module.exports = {
  MONGODB_URI,
  PORT,
  jwt_config,
}
