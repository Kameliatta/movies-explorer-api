const router = require('express').Router();
const { checkSignin, checkSignup } = require('../utils/validation');
const { createUser, login } = require('../controllers/users');

router.post('/signin', checkSignin, login);

router.post('/signup', checkSignup, createUser);

router.post('/signout', (req, res) => {
  res.clearCookie('jwt');
  return res.sendStatus(200);
});

module.exports = router;
