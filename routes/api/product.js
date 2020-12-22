const express = require('express');
const router = express.Router();

const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
  listSearch,
} = require('../../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../../controllers/auth');
const { userById } = require('../../controllers/user');

router.get('/api/product/:productId', read);
router.post(
  '/api/product/create/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  create
);
router.delete(
  '/api/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  '/api/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.get('/api/products', list);
router.get('/api/products/search', listSearch);
router.get('/api/products/related/:productId', listRelated);
router.get('/api/products/categories', listCategories);
router.post('/api/products/by/search', listBySearch);
router.get('/api/product/photo/:productId', photo);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
