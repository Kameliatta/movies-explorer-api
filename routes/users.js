const router = require('express').Router();
const { checkUpdatedUser } = require('../utils/validation');
const {
  getUsers,
  updateProfile,
} = require('../controllers/users');

router.get('/users/me', getUsers);
router.patch('/users/me', checkUpdatedUser, updateProfile);

module.exports = router;
