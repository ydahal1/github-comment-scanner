const moment = require("moment");

const Github = require("../services/githubService");
const ImageServcice = require("../services/imageService");
const ApiError = require("../services/exceptionService");
const logger = require("../../config/logger");

class GithubController {
  // Get issue
  async getIssue(req, res, next) {
    try {
      const { owner, repo, issue_number } = req.params;

      const gh = new Github(req.token);

      const data = await gh.getIssueById({ owner, repo, issue_number });
      res.status(200).json(data);
    } catch (error) {
      logger.error(error);
      return next(ApiError.badRequest(error.status, error.message));
    }
  }

  //Get issue and check if it has images
  async checkIfIssueContainsImage(req, res, next) {
    try {
      const { owner, repo, issue_number } = req.params;

      const gh = new Github(req.token);

      const { body } = await gh.getIssueById({ owner, repo, issue_number });
      const { error, result } = ImageServcice.doesImgExist(body);
      if (error) {
        logger.error(error);
        return next(ApiError.badRequest(error.status, error.message));
      }
      res.status(200).json({ containsImage: result });
    } catch (error) {
      logger.error(error);
      return next(ApiError.badRequest(error.status, error.message));
    }
  }

  // post comment on existing issue
  async addComment(req, res, next) {
    try {
      const { owner, repo, issue_number } = req.params;
      const { body } = req.body;
      const { token } = res.locals;

      const gh = new Github(token);
      await gh.addComment({ owner, repo, issue_number, body });
      res.status(200).json({ message: "success" });
    } catch (error) {
      logger.error(error);
      return next(ApiError.badRequest(error.status, error.message));
    }
  }

  //Identify if comment has image. If true add comment
  async identify(req, res, next) {
    try {
      const { owner, repo, issue_number } = req.params;
      let { body: comment } = req.body;
      const { token } = res.locals;

      const gh = new Github(token);

      const { body } = await gh.getIssueById({ owner, repo, issue_number });
      const { error, result } = ImageServcice.doesImgExist(body);
      if (error) {
        return next(ApiError.badRequest(error.status, error.message));
      }
      if (result) {
        const formattedDateTime = moment().format("MMMM Do YYYY, h:mm:ss a");

        comment = comment?.replace("{date} {time}", formattedDateTime);

        await gh.addComment({ owner, repo, issue_number, body: comment });
        res.status(200).json({ message: "success" });
      } else {
        res.status(404).json({ message: "No image found on  this issue" });
      }
    } catch (error) {
      logger.error(error);
      return next(ApiError.badRequest(error.status, error.message));
    }
  }
}

module.exports = new GithubController();
