module.exports = class CustomError extends Error {
  constructor (message, status) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.status = status || 400;
  }

  toResponseJSON () {
    return {
        success: false,
        exception: this.name,
        message: this.message
    }
  }
};
