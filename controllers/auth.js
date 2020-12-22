const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ err: errorHandler(err) });
    }
    res.json(user);
  });
};

exports.signin = (req, res) => {
  //find user based on the email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ err: 'Invalid email address' });
    }
    //make sure email and passwords do match
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: 'Email and password do not match' });
    }
    //generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persist the token in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 });
    //return response with user and token
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({ msg: 'Signout success' });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth',
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(401).json({ error: 'Access denied' });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(401).json({ error: 'Admin Only' });
  }
  next();
};
