const express = require('express');
const router = express.Router();

const decache = require("decache");

function requireNoCache(modulePathString){
    decache(modulePathString);
    return require(modulePathString);
}

const {Book, Order, Product, User} = require('../models/index');

const authGuard = require('../middleware/authGuard');
const upload = require('../middleware/uploadFileFormidable');

const statusRoutes = require('./status.routes');
const uploadRoutes = require('./upload.routes');
const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes')(Product, upload);
const orderRoutes = require('./order.routes');

const bookRoutes = require('./book.routes')(Book, null);

// you need no caching in the default routes module loading, otherwise you may get a singleton behavior 
// which resoults all routes using the first parameterization loaded (in case you use multiple time default routes)
const defaultBookRoutes = requireNoCache('./default.routes');(Book, null, null);

// Here is the place to handle the routing per Object
router.use('/api/protected', authGuard, statusRoutes);  // Protected Health endpoint
router.use('/api', statusRoutes);   // Public Health endpoint
router.use('/api/upload', uploadRoutes);
router.use('/api/user', userRoutes);


/// CUSTOM OBJECTS DECLARATION HERE ///////////////////////
router.use('/api/products', productRoutes);
router.use('/api/orders', orderRoutes);
router.use('/api/books/v2/', bookRoutes);
router.use('/api/books/v1/', defaultBookRoutes);

module.exports = router;
