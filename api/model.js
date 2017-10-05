let mongoose = require('mongoose');

let userSchema = {
    firstName: String,
    lastName: String
};

mongoose.model('users', userSchema);

module.exports = mongoose;