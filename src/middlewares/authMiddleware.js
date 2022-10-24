const { Octokit } = require('octokit')
const TokenService = require('../services/tokenService')
const ApiError = require('../services/exceptionService')

// To validate if token is valid we are making an api request to https://api.github.com/users/{GITHUB_USER}
// If the token is valid we get status 200
// Note - you can make request to any github username. Here we are using userprovided username
const auth = async (req, res, next) => {
  try {
    const creds = TokenService.getAccessToken(req.headers)

    const octokit = new Octokit({
      auth: creds[1]
    })

    const response = await octokit.request(`GET /users/${creds[0]}`)

    // If response is not 200 it will be an error which will be handled by catch block
    if (response.status === 200) {
      res.locals.token = creds[1]
      next()
    }
  } catch (err) {
    return next(ApiError.unauthorized())
  }
}

module.exports = auth
