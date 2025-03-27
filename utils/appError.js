class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith("4") ? "fail" : "error";

    this.isOperational = true; // Marks operational errors

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
