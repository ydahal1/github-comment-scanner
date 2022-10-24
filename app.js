const express = require('express')
const requestLogger = require('morgan')

const routes = require('./src/routes')
const errorHandler = require('./src/middlewares/errorMiddleware')

const app = express()

app.use(requestLogger('tiny')) // Logs every http requests
app.use(express.json())
app.use(routes)
app.use(errorHandler)

module.exports = app
