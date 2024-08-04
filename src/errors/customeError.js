
class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      
      // Capture the stack trace (optional)
      Error.captureStackTrace(this, this.constructor);
    }
  }


  module.exports = CustomError;
