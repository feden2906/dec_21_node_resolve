const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), 'environments', `${process.env.MODE}.env`)})

const { authRouter, userRouter } = require('./routes');
const { configs } = require('./configs');

mongoose.connect(configs.MONGO_URL);

const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use('*', (req, res) => {
  res.status(404).json('Route not found');
});

app.use((err, req, res, next) => {
  res
      .status(err.status || 500)
      .json({
        error: err.message || 'Unknown Error',
        code: err.status || 500
      });
});

app.listen(configs.PORT, () => {
  console.log(`Started on port ${configs.PORT}`);
});
