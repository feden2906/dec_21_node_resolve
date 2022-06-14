const express = require('express');

const { userRouter } = require('./routes');
const { constants } = require('./configs');

const app = express();
app.use(express.json());

app.use('/users', userRouter);

app.use('*', (req, res) => {
  res.status(404).json('Page not found');
});

app.listen(constants.PORT, () => {
  console.log(`Started on port ${constants.PORT}`);
});
