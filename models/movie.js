const mongoose = require('mongoose');
require('mongoose-type-url');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: mongoose.SchemaTypes.Url,
    required: true,
    validate: {
      validator: (v) => /https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%.+~#=//?&]*)/.test(v),
      message: 'Некорректная ссылка',
    },
  },
  trailerLink: {
    type: mongoose.SchemaTypes.Url,
    required: true,
    validate: {
      validator: (v) => /https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%.+~#=//?&]*)/.test(v),
      message: 'Некорректная ссылка',
    },
  },
  thumbnail: {
    type: mongoose.SchemaTypes.Url,
    required: true,
    validate: {
      validator: (v) => /https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%.+~#=//?&]*)/.test(v),
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
