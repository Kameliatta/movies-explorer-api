const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports.checkCreatedMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi
      .string()
      .required()
      .min(2)
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Некорректная ссылка');
      }),
    trailerLink: Joi
      .string()
      .required()
      .min(2)
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Некорректная ссылка');
      }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi
      .string()
      .required()
      .min(2)
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Некорректная ссылка');
      }),
    movieId: Joi.number().required(),
  }),
});

module.exports.checkDeletedMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

module.exports.checkUpdatedUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.checkSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().trim(),
  }),
});

module.exports.checkSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().trim(),
  }),
});
