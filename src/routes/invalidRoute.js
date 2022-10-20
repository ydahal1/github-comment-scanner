const ApiError = require("../services/exceptionService");

// When get/post request is sent to no existant route
module.exports = (req, res, next) => {
  next(ApiError.notFound());
};
