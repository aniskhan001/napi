// Dependencies
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let model = require('./model');

// list users
router.get('/', function(req, res){
    let taglist = req.query.tags;
    if (taglist) {
        // get users by tag
        taglist = taglist.split(',');

        model.find({ tags: { $in : taglist} }, function(err, data){
            if (err) {
                res.status(404).json({message: "not found"});                
            } else {
                let users = [];
                for (x in data) {
                    users.push({
                        id: data[x].id,
                        name: data[x].firstName + " " + data[x].lastName,
                        tags: data[x].tags
                    })
                }
                res.status(200).json(users);                
            }
        });
        
    } else {
        model.find({}, function(err, data){
            res.status(200).json(data);
        });
    }
    
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
                res.status(500).send({message: "error inserting to db"});
            } else {
                res.status(200).send({message: data});
            }
        })
    }
    
});

// get single user
router.get('/:id', function(req, res){
    let response = {};
    model.findById(req.params.id, function(err, data){
        if (err) {
            response.message = err;
            res.status(404).json(response);            
        } else {
            response.name = data.firstName + " " + data.lastName;
            res.status(200).json(response);
        }
    });
});


// post tags
router.post('/:id/tags', function(req, res){
    let response = {};
    let tags = req.body.tags;

    model.findById(req.params.id, function(err, data){
        data.tags = tags;
        data.save(function(err, updatedData){
            if (err) {
                res.status(500).json({});
            } else {
                res.status(200).send({});
            }
        })
    });
    
});


module.exports = router;