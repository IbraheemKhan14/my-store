const express = require('express');
const router = express.Router();

const { requireSignin, isAdmin, isAuth } = require('../../controllers/auth');
const {
  userById,
  read,
  update,
  purchaseHistory,
} = require('../../controllers/user');

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({ user: req.profile });
});

router.get('/api/user/:userId', requireSignin, isAuth, read);
router.put('/api/user/:userId', requireSignin, isAuth, update);
router.get(
  '/api/orders/by/user/:userId',
  requireSignin,
  isAuth,
  purchaseHistory
);

router.param('userId', userById);

module.exports = router;
