const ApiError = require('../services/exceptionService')

// If error caught by this middleware is instance of API error - send appropriate response
// If not send general http 500 status code
module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors })
  }
  return res.status(500).json({ message: 'Unknown Error' })
}
