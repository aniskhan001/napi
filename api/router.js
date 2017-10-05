// Dependencies
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let config = require('./config');

// DB connection
mongoose.connect(config.database);
// mongoose.model(require('./model'));

router.get('/', function(req, res){
    res.send('API is working on /users endpoint');
});

router.post('/:id', function(req, res){
    let firstName = req.body.firstName;
})
module.exports = router;