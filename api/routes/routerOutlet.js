const express = require('express');
const router = express.Router();

const authGuard = require('../middleware/authGuard');

const statusRoutes = require('./status.routes');
const uploadRoutes = require('./upload.routes');
const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes');
const orderRoutes = require('./order.routes');
//const bookRoutes = require('./book.routes');

const Book = require('../models/book');
const defaultbookRoutes = require('./default.routes')(Book, null);

// Here is the place to handle the routing per Object
router.use('/api/protected', authGuard, statusRoutes);  // Protected Health endpoint
router.use('/api', statusRoutes);   // Public Health endpoint
router.use('/api/upload', uploadRoutes);

router.use('/api/user', userRoutes);
router.use('/api/products', productRoutes);
router.use('/api/orders', orderRoutes);
//router.use('/api/books', bookRoutes);
router.use('/api/books', defaultbookRoutes);

module.exports = router;
