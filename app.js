const express = require('express');

const app = express();

const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
// 1) MIDDLEWARES
app.use(express.json());
if (process.env.NODE_ENV.trim() === 'development') {
  app.use(morgan('dev'));
}

// 3) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) SERVER

module.exports = app;
