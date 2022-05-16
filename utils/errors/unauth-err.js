class UnauthorizedError extends Error {
  constructor() {
    super();
    this.statusCode = 401;
    this.message = 'Неверный email или пароль';
  }
}

module.exports = { UnauthorizedError };
