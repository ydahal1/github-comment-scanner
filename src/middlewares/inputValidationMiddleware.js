const { validationResult, param, body } = require('express-validator')
const ApiError = require('../services/exceptionService')

// Validate requst params and body
const validate = (inputs) => {
  return async (req, res, next) => {
    await Promise.all(inputs.map((input) => input.run(req)))
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      return next()
    }

    return next(ApiError.validationError('Invalid input', errors))
  }
}

// Get comment params
const getCommentParams = [
  param('owner')
    .exists()
    .isString()
    .trim()
    .escape()
    .withMessage('Invalid owner'),
  param('repo').exists().isString().trim().escape().withMessage('repo'),
  param('issue_number')
    .exists()
    .trim()
    .escape()
    .isNumeric()
    .withMessage('Invalid issue number')
]

// Post comment body
const postCommentBody = [
  body('body').not().isEmpty().trim().escape().withMessage('Invalid comment')
]

module.exports = {
  validateGetCommentParams: validate(getCommentParams),
  validatePostCommentBody: validate(postCommentBody)
}
