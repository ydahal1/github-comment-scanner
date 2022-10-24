const express = require('express')
const router = express.Router()

const ghController = require('../../controllers/GithubControllers')
const {
  validateGetCommentParams,
  validatePostCommentBody
} = require('../../middlewares/inputValidationMiddleware')

// All routes -> middlewares -> controllers
router.get(
  '/github/:owner/:repo/issue/:issue_number',
  validateGetCommentParams,
  ghController.getIssue
)

router.get(
  '/github/:owner/:repo/issue/:issue_number/image',
  validateGetCommentParams,
  ghController.checkIfIssueContainsImage
)

router.post(
  '/github/:owner/:repo/issues/:issue_number/comment',
  validateGetCommentParams,
  validatePostCommentBody,
  ghController.addComment
)

router.post(
  '/github/:owner/:repo/issues/:issue_number/identify',
  validateGetCommentParams,
  validatePostCommentBody,
  ghController.identify
)

module.exports = router
