// Dependencies
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let model = require('./model');

// DB connection
// mongoose.connect(config.database);
// mongoose.model(require('./model'));

router.get('/', function(req, res){
    model.find({}, function(err, data){
        res.json(data);
    });
});

// save user info
router.post('/', function(req, res){
    let db = new model();
    let response = {};
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    if (!firstName && !lastName) {
        response = {status: 403, message: "please enter firstname and lastname"};
    } else {
        db.firstName = firstName;
        db.lastName = lastName;
        db.save(function(err, data){
            // saving
            if (err) {
                response = {status: 500, message: "error inserting to db"};
            } else {
                response = {status: 200, message: data};        
            }
        })
    }

    res.send(response);
    
});

module.exports = router;