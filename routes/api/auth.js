const express = require('express');
const router = express.Router();

const { userSignupValidator } = require('../../validator/index');
const {
  signup,
  signin,
  signout,
  requireSignin,
} = require('../../controllers/auth');

router.post('/api/signup', userSignupValidator, signup);
router.post('/api/signin', signin);
router.get('/api/signout', signout);

module.exports = router;
