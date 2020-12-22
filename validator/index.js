exports.userSignupValidator = (req, res, next) => {
  req.check('name', 'Name is required').notEmpty();
  req.check('email', 'Please include a valid email').isEmail();
  req
    .check('password', 'Please enter a password with 6 or more characters')
    .isLength({ min: 6 });
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
