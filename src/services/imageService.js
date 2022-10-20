const logger = require("../../config/logger");

//Image service checks if image is present in body of github comment
class ImageServcice {
  static doesImgExist(body) {
    if (typeof body !== "string") {
      const error = new Error();
      error.message = `Expected string but received ${typeof body}`;
      error.status = 422;
      return {
        error,
        result: false,
      };
    }

    //If text "user-images" is included in body, image exists - true
    const exist = body.includes("user-images");
    return { error: null, result: exist };
  }
}

module.exports = ImageServcice;
