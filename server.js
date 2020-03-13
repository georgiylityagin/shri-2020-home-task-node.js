const path = require('path');
const express = require('express');
require('dotenv').config()

const app = express();

app.use(express.static(path.resolve(__dirname, 'static')));

app.listen(3000);