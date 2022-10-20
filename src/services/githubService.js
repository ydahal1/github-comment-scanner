const { Octokit } = require("octokit");

class Github {
  constructor(token) {
    this.octokit = new Octokit({ auth: token });
  }

  // Get issue  by issue ID
  async getIssueById({ owner, repo, issue_number }) {
    const response = await this.octokit.request(
      "GET /repos/{owner}/{repo}/issues/{issue_number}",
      {
        owner,
        repo,
        issue_number,
      }
    );

    const { id, title, body } = response.data;
    return { id, title, body };
  }

  //Add comment on existing issue
  async addComment({ owner, repo, issue_number, body }) {
    const response = await this.octokit.request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        owner,
        repo,
        issue_number,
        body,
      }
    );
    return response.status;
  }
}

module.exports = Github;
