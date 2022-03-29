const router = require('express').Router();
const { checkCreatedMovie, checkDeletedMovie } = require('../utils/validation');
const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovie);

router.post('/movies', checkCreatedMovie, createMovie);

router.delete('/movies/:_id', checkDeletedMovie, deleteMovie);

module.exports = router;
