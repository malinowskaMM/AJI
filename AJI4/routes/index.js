const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/IndexController');
const ProductsController = require('../controllers/ProductsController');
const CategoriesController = require('../controllers/CategoriesController');
const OrderStatusController = require('../controllers/OrderStatusController');
router.get('/products', ProductsController.getAll);
router.get('/products/:id', ProductsController.getById);
router.post('/products', ProductsController.store);
router.put('/products', ProductsController.updateById);
router.get('/categories', CategoriesController.getAll);
router.get('/status', OrderStatusController.getAll);

router.get('/', IndexController.home);

module.exports = router;