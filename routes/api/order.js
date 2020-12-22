const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../../controllers/auth');
const { userById, addOrderToUserHistory } = require('../../controllers/user');
const {
  create,
  listOrders,
  getStatusValues,
  orderById,
  updateOrderStatus,
} = require('../../controllers/order');
const { decreaseQuantity } = require('../../controllers/product');

router.post(
  '/api/order/create/:userId',
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  create
);
router.get(
  '/api/order/list/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  listOrders
);
router.get(
  '/api/order/status-values/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  getStatusValues
);
router.put(
  '/api/order/:orderId/status/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  updateOrderStatus
);

router.param('userId', userById);
router.param('orderId', orderById);

module.exports = router;
