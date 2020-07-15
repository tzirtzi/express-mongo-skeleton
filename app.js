const path = require('path');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

// middleware import
const cors = require('./api/middleware/cors');
const corsOptions = require('./api/middleware/corsOptions');
const notFound = require('./api/middleware/notFound');
const errorHandling = require('./api/middleware/errorHandling');


const router = require('./api/routes/routerOutlet');

const app = express();
const mongooseConnect = require('./api/data/mongooseConnect')(mongoose);


// Middleware 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')) ); 

// Fix CORS headers, needed to allow access to SPAs / UIs 
app.use(cors);

// Preflight request options
app.options(corsOptions);

// Routing 
app.use('/', router);

// Not Found
app.use(notFound);

// Error handling for all application errors
app.use(errorHandling);


module.exports = app;
