const Movie = require('../models/movie');
const { BadRequestError } = require('../utils/errors/bad-request-err');
const { NotFoundError } = require('../utils/errors/not-found-err');
const { ForbiddenError } = require('../utils/errors/forbidden-err');

function catchError(card) {
  if (!card) {
    throw new NotFoundError();
  }
}

module.exports.getMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      if (!movie) {
        throw new BadRequestError();
      }
      res.send(movie);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      catchError(movie);
      if (req.user._id === movie.owner.toString()) {
        Movie.findByIdAndRemove(req.params._id)
          .then(() => {
            catchError(movie);
            res.status(200).send({ message: 'Фильм удалён' });
          })
          .catch(next);
      } else {
        throw new ForbiddenError();
      }
    })
    .catch(next);
};
