const express = require('express');
require('dotenv').config()

const app = express();
const { router } = require('./routes/routes');

const cors = require('cors');

app.use(cors())

app.use('/api', router);

app.listen(3000, err => {
  if (err) {
    console.error(err)
  }
});