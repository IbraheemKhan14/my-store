const express = require('express');
const router = express.Router();

const {
  create,
  categoryById,
  read,
  update,
  remove,
  list,
} = require('../../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../../controllers/auth');
const { userById } = require('../../controllers/user');

router.get('/api/category/:categoryId', read);
router.post(
  '/api/category/create/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  create
);
router.put(
  '/api/category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  '/api/category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.get('/api/categories', list);

router.param('userId', userById);
router.param('categoryId', categoryById);

module.exports = router;
