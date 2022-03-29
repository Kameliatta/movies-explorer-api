class ForbiddenError extends Error {
  constructor() {
    super();
    this.statusCode = 403;
    this.message = 'Вы не являетесь владельцем';
  }
}

module.exports = { ForbiddenError };
