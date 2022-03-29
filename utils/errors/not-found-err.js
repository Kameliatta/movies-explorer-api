class NotFoundError extends Error {
  constructor() {
    super();
    this.statusCode = 404;
    this.message = 'Объект с указанным _id не найден';
  }
}

module.exports = { NotFoundError };
