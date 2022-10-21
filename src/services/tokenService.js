const ApiError = require("../services/exceptionService");
class TokenService {
  static validateAccessToken(accessToken) {}

  static getAccessToken(headers) {
    // Make sure auth header/access token is present
    const authorizationHeader = headers.authorization;
    if (!authorizationHeader) throw ApiError.unauthorized();

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) throw ApiError.unauthorized();

    //Decoding base64 string - Postman sends creds base64 encoded
    const buf = Buffer.from(accessToken, "base64");
    const decodedString = buf.toString("utf8");
    const creds = decodedString.split(":"); // username:accesstoken
    return creds;
  }
}

module.exports = TokenService;
