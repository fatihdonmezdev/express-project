const express = require('express');
const app = express();
const fs = require('fs');

const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1) MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));

// 3) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//4) SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}....`);
});
