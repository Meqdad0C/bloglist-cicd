const express = require('express')
require('express-async-errors')
const database = require('./module/database')
const cors = require('cors')
const morgan = require('morgan')
const middleware = require('./utils/middleware')
const blogRouter = require('./controller/blogs')
const usersRouter = require('./controller/users')
const loginRouter = require('./module/login')
const { expressjwt: jwt } = require('express-jwt')
const { jwt_config } = require('./utils/config')

const app = express()
database.connect()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('dist'))
app.use(express.static('public'))
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', jwt(jwt_config), blogRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controller/testing')
  app.use('/api/testing', testingRouter)
}

app.get('/version', (req, res) => {
  res.send('<h1>Meqdad Amr v0.0.1</h1>')
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
