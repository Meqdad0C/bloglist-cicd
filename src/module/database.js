const { MONGODB_URI } = require('../utils/config')
const logger = require('../utils/logger')
const mongoose = require('mongoose')

const url = MONGODB_URI

const connect = () => {
  mongoose.set('strictQuery', false)
  mongoose
    .connect(url)
    .then(() => {
      logger.info('connected to MongoDB')
    })
    .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message)
    })
}

module.exports = { connect }
