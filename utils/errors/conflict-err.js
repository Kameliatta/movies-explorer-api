class ConflictError extends Error {
  constructor() {
    super();
    this.statusCode = 409;
    this.message = 'Такой пользователь уже существует';
  }
}

module.exports = { ConflictError };
