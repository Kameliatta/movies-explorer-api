const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { auth } = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { checkErrors } = require('./middlewares/checkErrors');
const { NotFoundError } = require('./utils/errors/not-found-err');
const limiter = require('./utils/rateLimiter');

const { NODE_ENV, MONGO_SERVER } = process.env;

require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());

app.use(cookieParser());
app.use(cors({
  origin: [
    'https://movies-explo.nomoredomains.work',
    'http://movies-explo.nomoredomains.work',
    'http://localhost:3000'],
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

app.use(require('./routes/index'));

app.use(auth, (req, res, next) => {
  next(new NotFoundError('Роут не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(checkErrors);

mongoose.connect(NODE_ENV === 'production' ? MONGO_SERVER : 'mongodb://localhost:27017/moviesdb');

app.listen(PORT);
