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
    var buf = Buffer.from(accessToken, "base64");
    let decodedString = buf.toString("utf8");
    const creds = decodedString.split(":");
    return creds;
  }
}

module.exports = TokenService;
