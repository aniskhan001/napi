let express = require('express');
let bodyParser = require('body-parser');

let app = express();
let PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', require('./api/router'));

app.listen(PORT);
console.log('API working on PORT: ' + PORT);
