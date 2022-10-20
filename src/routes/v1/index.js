const express = require("express");
const router = express.Router();

const ghController = require("../../controllers/GithubControllers");
const auth = require("../../middlewares/authMiddleware");
const {
  validateGetCommentParams,
  validatePostCommentBody,
} = require("../../middlewares/inputValidationMiddleware");

// All routes -> middlewares -> controllers
router.get(
  "/github/:owner/:repo/issue/:issue_number",
  auth,
  validateGetCommentParams,
  ghController.getIssue
);

router.get(
  "/github/:owner/:repo/issue/:issue_number/image",
  auth,
  validateGetCommentParams,
  ghController.checkIfIssueContainsImage
);

router.post(
  "/github/:owner/:repo/issues/:issue_number/comment",
  auth,
  validateGetCommentParams,
  validatePostCommentBody,
  ghController.addComment
);

router.post(
  "/github/:owner/:repo/issues/:issue_number/identify",
  auth,
  validateGetCommentParams,
  validatePostCommentBody,
  ghController.identify
);

module.exports = router;
