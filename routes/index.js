const router = require('express').Router();
const { auth } = require('../middlewares/auth');

router.use(require('./account'));
router.use(auth, require('./users'));
router.use(auth, require('./movies'));

module.exports = router;
