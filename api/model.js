let mongoose = require('mongoose');
let config = require('./config');
let schema = mongoose.Schema;

mongoose.connect(config.database);

let userSchema = {
    firstName: String,
    lastName: String,
    tags: Array
};

module.exports = mongoose.model('users', userSchema);