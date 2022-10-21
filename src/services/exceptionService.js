// Exception service for handling all kind of errors
class ApiError extends Error {
  constructor(status, message, errors) {
    super(message);
    this.status = status;
    if (errors) this.errors = errors;
  }

  //Invalid routes, invalid issue_number etc
  static notFound() {
    return new ApiError(404, "Sorry can't find that");
  }

  //Invalid token/username
  static unauthorized() {
    return new ApiError(401, "Unauthorized");
  }

  //User provided inputs like body and params
  static validationError(message) {
    return new ApiError(403, message);
  }

  // Other unknown errors or caught exceptions
  static badRequest(message) {
    return new ApiError(500, message);
  }
}

module.exports = ApiError;
