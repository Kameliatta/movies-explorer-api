const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovie);

router.post('/', celebrate({
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
      .pattern(
        /https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%.+~#=//?&]*)/,
      ),
    trailerLink: Joi
      .string()
      .required()
      .min(2)
      .pattern(
        /https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%.+~#=//?&]*)/,
      ),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi
      .string()
      .required()
      .min(2)
      .pattern(
        /https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%.+~#=//?&]*)/,
      ),
    movieId: Joi.number().required(),
  }),
}), createMovie);

router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
