const express = require('express');
const config = require('./server-conf.json');
const router = require('./routes/routes');

const app = express();

app.use(express.json());
app.use('/', router);

app.listen(config.port, err => {
  if (err) {
    console.error(err)
  }
});