const express = require('express');
const router = express.Router();

const {Book, Order, Product, User} = require('../models/index');
const defaultRouter = require('./default.routes');

const authGuard = require('../middleware/authGuard');

const statusRoutes = require('./status.routes');
const uploadRoutes = require('./upload.routes');
const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes');
const orderRoutes = require('./order.routes');

const bookRoutes = require('./book.routes')(Book, null);
const defaultBookRoutes = defaultRouter(Book, null, null);

// Here is the place to handle the routing per Object
router.use('/api/protected', authGuard, statusRoutes);  // Protected Health endpoint
router.use('/api', statusRoutes);   // Public Health endpoint
router.use('/api/upload', uploadRoutes);

router.use('/api/user', userRoutes);
router.use('/api/products', productRoutes);
router.use('/api/orders', orderRoutes);
router.use('/api/books/v2/', bookRoutes);
router.use('/api/books/v1/', defaultBookRoutes);

module.exports = router;
