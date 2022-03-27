const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors, celebrate, Joi } = require('celebrate');
const { auth } = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NotFoundError } = require('./utils/errors/not-found-err');

require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());
app.use(cors({
  // origin: ['https://project-mesto.students.nomoredomains.xyz', 'http://project-mesto.students.nomoredomains.xyz'],
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().trim(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().trim(),
  }),
}), createUser);

app.post('/signout', (req, res) => {
  res.clearCookie('jwt');
  return res.sendStatus(200);
});

app.use('/users', auth, require('./routes/users'));
app.use('/movies', auth, require('./routes/movies'));

app.use(auth, (req, res, next) => {
  next(new NotFoundError('Роут не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Произошла ошибка'
        : message,
    });

  next();
});

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.listen(PORT);
