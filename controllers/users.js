const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { NotFoundError } = require('../utils/errors/not-found-err');
const { ConflictError } = require('../utils/errors/conflict-err');
const { UnauthorizedError } = require('../utils/errors/unauth-err');

const { NODE_ENV, JWT_KEY } = process.env;

const SOLT_ROUND = 10;

function checkError(user) {
  if (!user) {
    throw new NotFoundError('Пользователь с указанным _id не найден');
  }
}

module.exports.getUsers = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      checkError(user);
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Такой email уже используется'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;

  bcrypt.hash(req.body.password, SOLT_ROUND)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name,
    }))
    .then(() => {
      res.send({
        data: {
          name,
          email,
        },
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Такой пользователь уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неверный email или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неверный email или пароль'));
          }

          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_KEY : 'dev-secret',
            { expiresIn: '7d' },
          );
          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            secure: process.env.NODE_ENV !== 'development',
            httpOnly: true,
            sameSite: 'none',
          });

          return res.status(200).send({ _id: user._id, email: user.email });
        });
    })
    .catch(next);
};
