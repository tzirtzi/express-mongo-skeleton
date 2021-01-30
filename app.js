const path = require('path');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors'); // fully fledged package

// middleware import
const corsHeaders = require('./api/middleware/cors'); // custom implementation 
// const corsOptions = require('./api/middleware/corsOptions'); // does not work for prefligh options

const notFound = require('./api/middleware/notFound');
const errorHandling = require('./api/middleware/errorHandling');

const routerOutlet = require('./api/routes/routerOutlet');

const app = express();
const mongooseConnect = require('./api/data/mongooseConnect')(mongoose);

// const nocache = require('nocache')
// app.use(nocache())  //This will (try to) abolish all client-side caching.

// Middleware 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')) ); 

// Fix CORS headers, needed to allow access to SPAs / UIs 
app.use(corsHeaders);

// enable pre-flight across-the-board 
app.options('*', cors())

// Preflight request options
// app.options(corsOptions);

// Routing 
app.use('/', routerOutlet);

// Not Found
app.use(notFound);

// Error handling for all application errors
app.use(errorHandling);


module.exports = app;
