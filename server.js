const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/users', require('./api/router'));

app.listen(PORT);
console.log('API working on PORT: ' + PORT);
