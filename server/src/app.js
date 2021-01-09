// const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const errorHandler = require('./exception/handler');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerOption = require('./swaggerOption');

const memoryMap = require('./memory');
memoryMap.init();

let app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../public')));
app.use(cors());

// route swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOption)));

// route handlers
app.use('/api/vi', require('./routes/index'));
app.use('/api/v1/admin', require('./routes/v1/admin'));
app.use('/api/v1/tx', require('./routes/v1/transaction').router);

// Error Handlers
app.use(errorHandler.Logger);
app.use(errorHandler.ErrorHandler);

module.exports = app;
